import styled from "styled-components";
import { useState } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import convertToLetterString from "@/features/ProductDetail/utils/convertIdToStr";
import { EditRefundRequest } from "../api/refundDetailApi";
import { useOutletContext } from "react-router-dom";

const StyledPopUp = styled(PopUp)`
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  min-width: 30rem;

  > button {
    background-color: white;
    border: none;
    background-color: red;
    color: white;
    padding: 10px 1rem;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > svg {
    transform: translate(90%, -90%);
    background-color: white;

    &:hover {
      background-color: white;
    }
  }
`;

const Input = styled.textarea`
  padding: 8px;
  border-radius: 3px;
  width: 100%;

  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;
  height: 15rem;
  resize: none;

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }

  &:active {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

export default function DecisionPopUp({ refund, order, action }) {
  const connection = useOutletContext();
  const editRefundRequest = EditRefundRequest();
  const [response, setResponse] = useState("");

  const onDesicion = (decision) => {
    const formData = new FormData();

    formData.append("RefundId", refund.data.data.id);
    formData.append("ResponseRefund", response);
    formData.append("Status", decision);

    editRefundRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          refund.refetch();
          order.refetch();
          if (connection) {
            connection.invoke("SendMessageUser", {
              UserId: order.data.data.userId,
              Message: `${
                convertToLetterString(order.data.data.payment.deliveryType.id, 1) +
                convertToLetterString(order.data.data.variant.product.categoryId, 2) +
                convertToLetterString(order.data.data.variant.id, 5) +
                convertToLetterString(order.data.data.id, 8)
              } order has just been ${decision} to refund`,
            });
          }
          action();
        }
      },
    });
  };

  return (
    <StyledPopUp action={() => {}}>
      <Header>
        <h4>
          Order #
          {convertToLetterString(order.data.data.payment.deliveryType.id, 1) +
            convertToLetterString(order.data.data.variant.product.categoryId, 2) +
            convertToLetterString(order.data.data.variant.id, 5) +
            convertToLetterString(order.data.data.id, 8)}
        </h4>
        <XButton action={action} />
      </Header>
      <Container>
        <div>
          <h5>Response: </h5>
          <Input value={response} onChange={(ev) => setResponse(ev.target.value)} />
        </div>

        <Buttons>
          <button onClick={() => onDesicion("Success")}>Accept</button>
          <button onClick={() => onDesicion("Denied")}>Deny</button>
        </Buttons>
      </Container>
    </StyledPopUp>
  );
}
