import styled from "styled-components";
import { useEffect, useState } from "react";
import CreateEmployeePopUp from "./components/PopUp/CreateEmployeePopUp";
import { GetEmployeeRequest } from "./api/employeeApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import EmployeePagination from "./components/pagination/EmployeePagination";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { useSearchParams } from "react-router-dom";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";
import ProductPagination from "../admin-product-list/components/pagination/ProductPagination";
import { ActivateEmployeeRequest } from "./api/employeeApi";
import { DeActivateEmployeeRequest } from "./api/employeeApi";
import UpdateEmployeePopUp from "./components/PopUp/UpdateEmployeePopUp";

const Container = styled.div`
  margin: auto;
  max-width: 75rem;
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

  > button {
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

  > button:hover {
    background-color: #0052cc;
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;

  font-size: 0.9em;
  min-width: 400px;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & .action {
    > button {
      background-color: white;
      color: #0b74e5;
      border-radius: 5px;
      border: 1px solid #0b74e5;
      padding: 5px 8px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }

    display: flex;
    gap: 10px;
  }
`;

export default function Employee() {
  const activateEmployeeRequest = ActivateEmployeeRequest();
  const deActivateEmployeeRequest = DeActivateEmployeeRequest();
  const [searchParams, setSearchParams] = useSearchParams();
  const [createPopUp, setCreatePopUp] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(searchParams.get("currentpage") || 1);
  const getEmployeeRequest = GetEmployeeRequest(currentPage, 20);
  const [acitveConfirm, setActiveConfirm] = useState(false);
  const [deactiveConfirm, setDeactiveConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [chosenEmployee, setChosenEmployee] = useState();

  const [update, setUpdate] = useState(false);

  if (getEmployeeRequest.isLoading) {
    return <WaitingPopUp />;
  }

  const onClickActive = (user) => {
    setChosenEmployee(user);
    setConfirmMessage("Are you sure you want to active " + user.fullname);
    setActiveConfirm(true);
  };

  const onClickDeactive = (user) => {
    setChosenEmployee(user);
    setConfirmMessage("Are you sure you want to deactive " + user.fullname);
    setDeactiveConfirm(true);
  };

  const onActivate = (user) => {
    const formData = new FormData();
    formData.append("userId", user.id);

    activateEmployeeRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getEmployeeRequest.refetch();
        }
      },
    });
  };

  const onDeactivate = (user) => {
    const formData = new FormData();
    formData.append("userId", user.id);

    deActivateEmployeeRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getEmployeeRequest.refetch();
        }
      },
    });
  };

  return (
    <Container>
      <Header>
        <h4>Employee</h4>
        <button onClick={() => setCreatePopUp(true)}>Create New Employee</button>
      </Header>
      <Content>
        <TableContent>
          <thead>
            <tr>
              <th>S.No</th>
              <th>EMAIL</th>
              <th>ID</th>
              <th>PHONE NUMBER</th>
              <th>WORKING STATUS</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {getEmployeeRequest.isSuccess ? (
              getEmployeeRequest.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.email}</td>
                    <td>{item.id}</td>
                    <td>{item.phoneNumber || "_"}</td>
                    <td>{item.active ? "True" : "False"}</td>
                    <td>{item.address || "_"}</td>
                    <td className="action">
                      {item.active == true ? (
                        <button onClick={() => onClickDeactive(item)}>Deactive</button>
                      ) : (
                        <button onClick={() => onClickActive(item)}>Active</button>
                      )}
                      <button
                        onClick={() => {
                          setUpdate(true);
                          setChosenEmployee(item);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <WaitingIcon />
                </td>
              </tr>
            )}
          </tbody>
        </TableContent>
        <Footer>
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={getEmployeeRequest.data.totalPages}
          />
        </Footer>
      </Content>
      {createPopUp && <CreateEmployeePopUp action={() => setCreatePopUp(false)} />}
      {acitveConfirm && (
        <ConfirmPopUp
          message={confirmMessage}
          cancel={() => setActiveConfirm(false)}
          confirm={() => {
            onActivate(chosenEmployee);
            setActiveConfirm(false);
          }}
        />
      )}
      {deactiveConfirm && (
        <ConfirmPopUp
          message={confirmMessage}
          cancel={() => setDeactiveConfirm(false)}
          confirm={() => {
            onDeactivate(chosenEmployee);
            setDeactiveConfirm(false);
          }}
        />
      )}
      {update && (
        <UpdateEmployeePopUp
          action={() => {
            setUpdate(false);
          }}
          employee={chosenEmployee}
        />
      )}
    </Container>
  );
}
