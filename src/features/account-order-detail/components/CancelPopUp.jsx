import styled from "styled-components";
import { useState } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import convertToLetterString from "@/features/ProductDetail/utils/convertIdToStr";
import SelectInput from "@/shared/components/Input/SelectInput";
import { CancelOrderRequest } from "../api/orderDetailApi";
import { useOutletContext } from "react-router-dom";

const StyledPopUp = styled(PopUp)`
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;

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

const options = [
  { value: "Changed mind or no longer needed", label: "Changed mind or no longer needed" },
  { value: "Found a better price elsewhere", label: "Found a better price elsewhere" },
  { value: "Financial constraints", label: "Financial constraints" },
  { value: "Poor customer service experience", label: "Poor customer service experience" },
  { value: "Ordered the wrong item or quantity", label: "Ordered the wrong item or quantity" },
  { value: "Shipping cost or method issues", label: "Shipping cost or method issues" },
  { value: "Concerns about product quality", label: "Concerns about product quality" },
  {
    value: "Personal reasons or unexpected circumstances",
    label: "Personal reasons or unexpected circumstances",
  },
  { value: "Other", label: "Other" },
];

export default function CancelPopUp({ order, action }) {
  const connection = useOutletContext();
  const [chosenOption, setChosenOption] = useState(options[0]);
  const [detail, setDetail] = useState("");
  const cancelOrderRequest = CancelOrderRequest();

  const onCancel = () => {
    const formData = new FormData();
    formData.append("OrderId", order.data.data.id);
    formData.append("Reason", detail ? detail : chosenOption.value);

    cancelOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          order.refetch();
          if (connection) {
            connection.invoke("SendMessageAdmin", {
              UserId: order.data.data.userId,
              Message: `${
                convertToLetterString(order.data.data.payment.deliveryType.id, 1) +
                convertToLetterString(order.data.data.variant.product.categoryId, 2) +
                convertToLetterString(order.data.data.variant.id, 5) +
                convertToLetterString(order.data.data.id, 8)
              } order has just been canceled`,
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
          Reason to cancel order #
          {convertToLetterString(order.data.data.payment.deliveryType.id, 1) +
            convertToLetterString(order.data.data.variant.product.categoryId, 2) +
            convertToLetterString(order.data.data.variant.id, 5) +
            convertToLetterString(order.data.data.id, 8)}
        </h4>
        <XButton action={action} />
      </Header>
      <Container>
        <div>
          <h5>Reason: </h5>
          <SelectInput state={chosenOption} setState={setChosenOption} options={options} />
        </div>
        <div>
          <h5>Other reason: </h5>
          <Input value={detail} onChange={(ev) => setDetail(ev.target.value)} />
        </div>
        <button onClick={onCancel}>Submit</button>
      </Container>
    </StyledPopUp>
  );
}
