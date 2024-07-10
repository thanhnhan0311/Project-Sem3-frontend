import styled, { css } from "styled-components";
import { useState } from "react";
import { GetAdminOrderRequest } from "./api/adminOrdersApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import formatDollar from "@/shared/utils/FormatDollar";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { AcceptOrderRequest } from "./api/adminOrdersApi";
import { DenyOrderRequest } from "./api/adminOrdersApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { DeliveryOrderRequest } from "./api/adminOrdersApi";
import { FinishOrderRequest } from "./api/adminOrdersApi";
import ProductPagination from "../admin-product-list/components/pagination/ProductPagination";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SelectInput from "@/shared/components/Input/SelectInput";
import { FaFilter } from "react-icons/fa";
import NumberInput from "@/shared/components/Input/NumberInput";
import SelectMultiple from "../admin-product-list/components/inputs/SelectMultiple";
import TextInput from "@/shared/components/Input/TextInput";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { useOutletContext } from "react-router-dom";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";
import ReportPopUp from "./components/ReportPopUp";

const Container = styled.div`
  margin: auto;
  width: 75rem;
  font-size: 14px;
  min-height: 40rem;
  padding: 3rem 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  > div {
    position: relative;
  }

  & button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
  }

  & button:hover {
    background-color: #0052cc;
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  min-height: 40rem;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;

  thead {
    background-color: #0091ea;
    & span {
      color: #ffffff;
    }
    text-align: left;
    font-weight: bold;

    th {
      padding: 12px 15px;
      white-space: nowrap; /* Ensure the text does not wrap */
    }
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    &:last-of-type {
      border-bottom: 2px solid #009879;
    }

    &.active-row {
      font-weight: bold;
      color: #009879;
    }
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  & .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;

    > button {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        color: red;
      }
    }
  }

  & .action {
    text-align: center;
  }
`;

const FilterBar = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderStatusButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;

  padding: 0 2rem;
  transition: all 0.2s;

  border-bottom: ${(props) =>
    props.$active == true ? "3px solid red" : "3px solid rgba(0,0,0,0)"};
`;

const Buttons = styled.div`
  display: flex;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  > div:nth-of-type(2) {
    display: flex;
    gap: 1rem;
  }
`;

const DropDown = styled.div`
  position: absolute;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  transform: translateY(10px);

  display: flex;
  flex-direction: column;
  width: 10rem;
  z-index: 1;
  > button {
    background-color: white;
    border: none;

    padding: 10px 16px;
    cursor: pointer;
    &:hover {
      background-color: #0091ea;
      color: white;
    }
  }
`;

const ActionButton = styled.div`
  position: relative;

  > button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 5px;
    border-radius: 5px;
  }
`;

const FilterDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(10px);
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 1rem;
  width: 15rem;
  z-index: 1;
  color: rgba(0, 0, 0, 0.7);

  > input {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const FilterDate = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 1rem;
  width: 15rem;
  z-index: 1;
  color: rgba(0, 0, 0, 0.7);
  transform: translate(-60%, 10%);

  > input {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const FilterTh = styled.th`
  position: relative;
  > button {
    border-radius: 5px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

    cursor: pointer;
    background-color: white;
    color: #0091ea;
    position: relative;
  }

  > svg {
    display: none;
  }

  ${(props) => {
    if (props.$active == true) {
      return css`
        > svg {
          cursor: pointer;
          display: inline-block;
          position: absolute;
          left: 100;
          transform: translate(0, -10%);
          width: 1.5rem;
          height: 1.5rem;
          color: white;
          background-color: #0091ea;
        }
      `;
    }
  }}
`;

const StyledLink = styled(Link)`
  color: #731a8b;

  &:active {
    color: red;
  }
`;

const pageAmount = [
  { value: 20, label: "20 items" },
  { value: 50, label: "50 items" },
  { value: 100, label: "100 items" },
];

const paymentOptions = [
  { value: "Credit", label: "Credit" },
  { value: "VPP", label: "VPP" },
  { value: "DD", label: "DD" },
  { value: "Cheque", label: "Cheque" },
];

const deliveryOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Fast", label: "Fast" },
];

const categoryOption = [
  { value: "Arts", label: "Arts" },
  { value: "Gift Articles", label: "Gift Articles" },
  { value: "Greeting Cards", label: "Greeting Cards" },
  { value: "Dolls", label: "Dolls" },
  { value: "Files", label: "Files" },
  { value: "Hand Bags", label: "Hand Bags" },
  { value: "Wallets", label: "Wallets" },
];

export default function AdminOrder() {
  const connection = useOutletContext();
  const [showReport, setShowReport] = useState();
  const navigate = useNavigate();
  const acceptOrderRequest = AcceptOrderRequest();
  const denyOrderRequest = DenyOrderRequest();
  const deliveryOrderRequest = DeliveryOrderRequest();
  const finishOrderRequest = FinishOrderRequest();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(pageAmount[0]);
  const [IsClickDropDown, setIsClickDropDown] = useState(false);
  const [acceptConfirm, setAcceptConfirm] = useState([]);
  const [denyConfirm, setDenyConfirm] = useState([]);
  const [deliveryConfirm, setDeliveryConfirm] = useState([]);
  const [successConfirm, setSuccessConfirm] = useState([]);

  const [filterFocus, setFilterFocus] = useState({
    orderId: false,
    customer: false,
    category: false,
    productCode: false,
    payment: false,
    paymentCode: false,
    delivery: false,
    total: false,
    date: false,
  });

  const [filterValue, setFilterValue] = useState({
    orderId: "",
    customer: "",
    category: [],
    productCode: "",
    payment: [],
    paymentCode: "",
    delivery: [],
    from: "",
    to: "",
    fromDate: "",
    toDate: "",
  });

  const [filterValueDisplay, setFilterValueDisplay] = useState({
    orderId: "",
    customer: "",
    category: [],
    productCode: "",
    payment: [],
    paymentCode: "",
    delivery: [],
    from: "",
    to: "",
    fromDate: "",
    toDate: "",
  });

  const onFocusFilter = (key, bool) => {
    const newFocus = {
      orderId: false,
      customer: false,
      category: false,
      productCode: false,
      payment: false,
      paymentCode: false,
      delivery: false,
      total: false,
      date: false,
    };

    newFocus[key] = bool;

    setFilterFocus(newFocus);
  };

  const [active, setActive] = useState("All");
  const [checkBox, setCheckBox] = useState([]);

  const getAdminOrdersetAdminOrderRequest = GetAdminOrderRequest(
    currentPage,
    totalPage.value,
    active,
    filterValue.orderId,
    filterValue.customer.trim(),
    filterValue.category?.map((item) => item.value),
    filterValue.productCode,
    filterValue.payment?.map((item) => item.value),
    filterValue.paymentCode,
    filterValue.delivery?.map((item) => item.value),
    filterValue.from,
    filterValue.to,
    filterValue.fromDate,
    filterValue.toDate
  );

  const onAccept = (id) => {
    const formData = new FormData();

    id.forEach((item) => formData.append("orderId", item));

    acceptOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getAdminOrdersetAdminOrderRequest.refetch();
          id.forEach((orderId) => {
            const order = getOrder(orderId);
            const orderIdString =
              convertToLetterString(order.payment.deliveryType.id, 1) +
              convertToLetterString(order.variant.product.categoryId, 2) +
              convertToLetterString(order.variant.id, 5) +
              convertToLetterString(order.id, 8);
            if (connection) {
              connection.invoke("SendMessageUser", {
                UserId: order.userId,
                Message: `Order ${orderIdString} has been accepted`,
              });
            }
          });
          setSuccess(true);
          setCheckBox((prev) => prev.filter((item) => !id.includes(item)));
          return;
        }

        if (response.status == 400) {
          getAdminOrdersetAdminOrderRequest.refetch();
          setError(true);
          return;
        }
      },
    });
  };

  const onDeny = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    denyOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getAdminOrdersetAdminOrderRequest.refetch();
          id.forEach((orderId) => {
            const order = getOrder(orderId);
            const orderIdString =
              convertToLetterString(order.payment.deliveryType.id, 1) +
              convertToLetterString(order.variant.product.categoryId, 2) +
              convertToLetterString(order.variant.id, 5) +
              convertToLetterString(order.id, 8);
            if (connection) {
              connection.invoke("SendMessageUser", {
                UserId: order.userId,
                Message: `Order ${orderIdString} has been denied`,
              });
            }
          });
          setSuccess(true);
          setCheckBox((prev) => prev.filter((item) => !id.includes(item)));
          return;
        }

        if (response.status == 400) {
          getAdminOrdersetAdminOrderRequest.refetch();
          setError(true);
          return;
        }
      },
    });
  };

  const onDelivery = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    deliveryOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getAdminOrdersetAdminOrderRequest.refetch();
          id.forEach((orderId) => {
            const order = getOrder(orderId);
            const orderIdString =
              convertToLetterString(order.payment.deliveryType.id, 1) +
              convertToLetterString(order.variant.product.categoryId, 2) +
              convertToLetterString(order.variant.id, 5) +
              convertToLetterString(order.id, 8);
            if (connection) {
              connection.invoke("SendMessageUser", {
                UserId: order.userId,
                Message: `Order ${orderIdString} has been delivery`,
              });
            }
          });
          setSuccess(true);
          setCheckBox((prev) => prev.filter((item) => !id.includes(item)));
          return;
        }

        if (response.status == 400) {
          getAdminOrdersetAdminOrderRequest.refetch();
          setError(true);
          return;
        }
      },
    });
  };

  const onSuccess = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    finishOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getAdminOrdersetAdminOrderRequest.refetch();
          id.forEach((orderId) => {
            const order = getOrder(orderId);
            const orderIdString =
              convertToLetterString(order.payment.deliveryType.id, 1) +
              convertToLetterString(order.variant.product.categoryId, 2) +
              convertToLetterString(order.variant.id, 5) +
              convertToLetterString(order.id, 8);
            if (connection) {
              connection.invoke("SendMessageUser", {
                UserId: order.userId,
                Message: `Order ${orderIdString} is success`,
              });
            }
          });
          setSuccess(true);
          setCheckBox((prev) => prev.filter((item) => !id.includes(item)));
          return;
        }

        if (response.status == 400) {
          getAdminOrdersetAdminOrderRequest.refetch();
          setError(true);
          return;
        }
      },
    });
  };

  function getOrder(orderId) {
    return getAdminOrdersetAdminOrderRequest.data.data.find((item) => item.id == orderId);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterValue(filterValueDisplay);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filterValueDisplay]);

  useEffect(() => {
    setCheckBox([]);
  }, [active]);

  return (
    <>
      <Container>
        <Header>
          <h4>
            Order {filterValueDisplay.fromDate && <span>from {filterValueDisplay.fromDate}</span>}{" "}
            {filterValueDisplay.toDate && <span> to {filterValueDisplay.toDate}</span>}
          </h4>
          <div>
            <button onClick={() => onFocusFilter("date", !filterFocus.date)}>Filter Date</button>
            {filterFocus.date && (
              <FilterDate>
                <h4>From: </h4>
                <input
                  value={filterValueDisplay.fromDate}
                  onChange={(ev) =>
                    setFilterValueDisplay((prev) => {
                      return { ...prev, fromDate: ev.target.value };
                    })
                  }
                  type="date"
                />
                <h4>To: </h4>
                <input
                  value={filterValueDisplay.toDate}
                  onChange={(ev) =>
                    setFilterValueDisplay((prev) => {
                      return { ...prev, toDate: ev.target.value };
                    })
                  }
                  type="date"
                />
              </FilterDate>
            )}
          </div>
        </Header>
        <Content>
          <div>
            <FilterBar>
              <Buttons>
                <OrderStatusButton $active={active == "All"} onClick={() => setActive("All")}>
                  All
                </OrderStatusButton>
                <OrderStatusButton
                  $active={active == "Pending"}
                  onClick={() => setActive("Pending")}
                >
                  Pending
                </OrderStatusButton>
                <OrderStatusButton
                  $active={active == "Accepted"}
                  onClick={() => setActive("Accepted")}
                >
                  Accepted
                </OrderStatusButton>
                <OrderStatusButton $active={active == "Denied"} onClick={() => setActive("Denied")}>
                  Denied
                </OrderStatusButton>
                <OrderStatusButton
                  $active={active == "Delivery"}
                  onClick={() => setActive("Delivery")}
                >
                  Delivery
                </OrderStatusButton>
                <OrderStatusButton
                  $active={active == "Success"}
                  onClick={() => setActive("Success")}
                >
                  Success
                </OrderStatusButton>
                <OrderStatusButton $active={active == "Cancel"} onClick={() => setActive("Cancel")}>
                  Cancel
                </OrderStatusButton>
              </Buttons>
              <Filter>
                <ActionButton>
                  {active != "All" && (
                    <button onClick={() => setIsClickDropDown((prev) => !prev)}>ACTIONS</button>
                  )}
                  {IsClickDropDown && (
                    <DropDown>
                      {active == "Pending" && (
                        <>
                          <button
                            disabled={checkBox.length == 0}
                            onClick={() => setAcceptConfirm(checkBox)}
                          >
                            ACCEPT
                          </button>
                          <button
                            disabled={checkBox.length == 0}
                            onClick={() => setDenyConfirm(checkBox)}
                          >
                            DENY
                          </button>
                        </>
                      )}
                      {active == "Accepted" && (
                        <button
                          disabled={checkBox.length == 0}
                          onClick={() => setDeliveryConfirm(checkBox)}
                        >
                          DELIVERY
                        </button>
                      )}
                      {active == "Delivery" && (
                        <button
                          disabled={checkBox.length == 0}
                          onClick={() => setSuccessConfirm(checkBox)}
                        >
                          FINISH ORDER
                        </button>
                      )}
                    </DropDown>
                  )}
                </ActionButton>
                <div>
                  <SelectInput state={totalPage} setState={setTotalPage} options={pageAmount} />
                  <button onClick={() => setShowReport(true)}>Export File</button>
                </div>
              </Filter>
            </FilterBar>
            <TableContent>
              <thead>
                <tr>
                  <th></th>
                  <FilterTh $active={filterValue.orderId != ""}>
                    <button onClick={() => onFocusFilter("orderId", !filterFocus.orderId)}>
                      ORDER ID
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, orderId: "" };
                        })
                      }
                    />
                    {filterFocus.orderId && (
                      <FilterDropDown>
                        <h4>Filter id</h4>
                        <NumberInput
                          state={filterValueDisplay.orderId}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, orderId: value };
                            })
                          }
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.customer != ""}>
                    <button onClick={() => onFocusFilter("customer", !filterFocus.customer)}>
                      CUSTOMER
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, customer: "" };
                        })
                      }
                    />
                    {filterFocus.customer && (
                      <FilterDropDown>
                        <h4>Filter Customer</h4>
                        <TextInput
                          state={filterValueDisplay.customer}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, customer: value };
                            })
                          }
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.category.length != 0}>
                    <button onClick={() => onFocusFilter("category", !filterFocus.category)}>
                      Category
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, category: [] };
                        })
                      }
                    />
                    {filterFocus.category && (
                      <FilterDropDown>
                        <h4>Filter Category</h4>
                        <SelectMultiple
                          state={filterValueDisplay.category}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, category: value };
                            })
                          }
                          options={categoryOption}
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.productCode != ""}>
                    <button onClick={() => onFocusFilter("productCode", !filterFocus.productCode)}>
                      PRODUCT CODE
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, productCode: "" };
                        })
                      }
                    />
                    {filterFocus.productCode && (
                      <FilterDropDown>
                        <h4>Filter Product Code</h4>
                        <NumberInput
                          state={filterValueDisplay.productCode}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, productCode: value };
                            })
                          }
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.payment.length != 0}>
                    <button onClick={() => onFocusFilter("payment", !filterFocus.payment)}>
                      PAYMENT
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, payment: [] };
                        })
                      }
                    />
                    {filterFocus.payment && (
                      <FilterDropDown>
                        <h4>Filter Payment</h4>
                        <SelectMultiple
                          state={filterValueDisplay.payment}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, payment: value };
                            })
                          }
                          options={paymentOptions}
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.paymentCode != ""}>
                    <button onClick={() => onFocusFilter("paymentCode", !filterFocus.paymentCode)}>
                      PAYMENT CODE
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, paymentCode: "" };
                        })
                      }
                    />
                    {filterFocus.paymentCode && (
                      <FilterDropDown>
                        <h4>Filter Payment Code</h4>
                        <NumberInput
                          state={filterValueDisplay.paymentCode}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, paymentCode: value };
                            })
                          }
                          options={paymentOptions}
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.delivery.length != 0}>
                    <button onClick={() => onFocusFilter("delivery", !filterFocus.delivery)}>
                      DELIVERY
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, delivery: [] };
                        })
                      }
                    />
                    {filterFocus.delivery && (
                      <FilterDropDown>
                        <h4>Filter Delivery</h4>
                        <SelectMultiple
                          state={filterValueDisplay.delivery}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, delivery: value };
                            })
                          }
                          options={deliveryOptions}
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh $active={filterValue.from != "" || filterValue.to != ""}>
                    <button onClick={() => onFocusFilter("total", !filterFocus.total)}>
                      TOTAL
                    </button>
                    <CiCircleRemove
                      onClick={() =>
                        setFilterValueDisplay((prev) => {
                          return { ...prev, from: "", to: "" };
                        })
                      }
                    />
                    {filterFocus.total && (
                      <FilterDropDown>
                        <h4>From</h4>
                        <NumberInput
                          state={filterValueDisplay.from}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, from: value };
                            })
                          }
                        />
                        <h4>To</h4>
                        <NumberInput
                          state={filterValueDisplay.to}
                          setState={(value) =>
                            setFilterValueDisplay((prev) => {
                              return { ...prev, to: value };
                            })
                          }
                        />
                      </FilterDropDown>
                    )}
                  </FilterTh>
                  <FilterTh>
                    <span>STATUS</span>
                  </FilterTh>
                  <FilterTh className="action">
                    <span>ACTION</span>
                  </FilterTh>
                </tr>
              </thead>
              <tbody>
                {getAdminOrdersetAdminOrderRequest.isLoading && <WaitingIcon />}

                {getAdminOrdersetAdminOrderRequest.isSuccess &&
                  getAdminOrdersetAdminOrderRequest.data.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <InputCheckBox
                            checked={checkBox.includes(item.id)}
                            onChange={() => {
                              if (checkBox.includes(item.id)) {
                                setCheckBox((prev) => prev.filter((i) => i != item.id));
                              } else {
                                setCheckBox((prev) => [...prev, item.id]);
                              }
                            }}
                          />
                        </td>
                        <td>
                          <StyledLink to={`/admin/order-detail?id=${item.id}`}>
                            {convertToLetterString(item.id, 8)}
                          </StyledLink>
                        </td>
                        <td>{item.user.fullname}</td>
                        <td>{item.variant.product.category.name}</td>
                        <td>
                          <StyledLink to={`/admin/product?id=${item.variant.product.id}`}>
                            {convertToLetterString(item.variant.id, 5)}
                          </StyledLink>
                        </td>
                        <td>{item.payment.paymentType.name}</td>
                        <td>{convertToLetterString(item.paymentId, 6)}</td>
                        <td>{item.payment.deliveryType.name}</td>
                        <td>${formatDollar(item.totalPrice)}</td>
                        <td>{!item.isCancel ? item.orderStatusType.name : "Cancel"}</td>
                        <td className="detail">
                          <button onClick={() => navigate(`/admin/order-detail?id=${item.id}`)}>
                            See Detail
                          </button>
                          {active == "Pending" && (
                            <>
                              <button onClick={() => setAcceptConfirm([item.id])}>ACCEPT</button>
                              <button onClick={() => setDenyConfirm([item.id])}>DENY</button>
                            </>
                          )}
                          {active == "Accepted" && (
                            <>
                              <button onClick={() => setDeliveryConfirm([item.id])}>
                                DELIVERY
                              </button>
                            </>
                          )}
                          {active == "Delivery" && (
                            <>
                              <button onClick={() => setSuccessConfirm([item.id])}>FINISH</button>
                            </>
                          )}
                          {active == "All" && (
                            <>
                              {item.orderStatusType.id == 13 && item.isCancel == false && (
                                <>
                                  <button onClick={() => setAcceptConfirm([item.id])}>
                                    ACCEPT
                                  </button>
                                  <button onClick={() => setDenyConfirm([item.id])}>DENY</button>{" "}
                                </>
                              )}
                              {item.orderStatusType.id == 14 && (
                                <button onClick={() => setDeliveryConfirm([item.id])}>
                                  DELIVERY
                                </button>
                              )}
                              {item.orderStatusType.id == 17 && (
                                <button onClick={() => setSuccessConfirm([item.id])}>FINISH</button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </TableContent>
          </div>
          <Footer>
            {getAdminOrdersetAdminOrderRequest.isSuccess && (
              <ProductPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={getAdminOrdersetAdminOrderRequest.data.totalPages}
              />
            )}
          </Footer>
        </Content>
      </Container>
      {success && <SuccessPopUp message={"success"} action={() => setSuccess(false)} />}
      {error && <ErrorPopUp message={"error"} action={() => setError(false)} />}
      {acceptConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setAcceptConfirm([])}
          message={"Are you sure you want to accept these order"}
          confirm={() => {
            onAccept(acceptConfirm);
            setAcceptConfirm([]);
          }}
        />
      )}
      {denyConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setDenyConfirm([])}
          message={"Are you sure you want to deny these order"}
          confirm={() => {
            onDeny(denyConfirm);
            setDenyConfirm([]);
          }}
        />
      )}
      {deliveryConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setDeliveryConfirm([])}
          message={"Are you sure you want to delivery these order"}
          confirm={() => {
            onDelivery(deliveryConfirm);
            setDeliveryConfirm([]);
          }}
        />
      )}
      {successConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setSuccessConfirm([])}
          message={"Are you sure you want to finish these order"}
          confirm={() => {
            onSuccess(successConfirm);
            setSuccessConfirm([]);
          }}
        />
      )}
      {showReport && <ReportPopUp action={() => setShowReport(false)} />}
    </>
  );
}
