import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled from "styled-components";
import { useState } from "react";
import { GetReportRequest } from "../api/adminOrdersApi";
import { saveAs } from "file-saver";

const StyledPopUp = styled(PopUp)`
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;

  & input {
    width: 100%;
  }

  > div:nth-of-type(3) {
    display: flex;
    justify-content: flex-end;

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
  }
`;

export default function ReportPopUp({ action }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getReportRequest = GetReportRequest();

  const onGetReport = () => {
    if (!fromDate || !toDate) {
      alert("from and to cannot be null");
      return;
    }
    getReportRequest.mutate(
      { DateFrom: fromDate, DateTo: toDate },
      {
        onSuccess: (response) => {
          const blob = new Blob([response], { type: "text/csv;charset=utf-8;" });
          saveAs(blob, "data.csv");
        },
      }
    );
  };

  return (
    <StyledPopUp action={action}>
      <Container>
        <div>
          <h4>From</h4>
          <input value={fromDate} onChange={(ev) => setFromDate(ev.target.value)} type="date" />
        </div>
        <div>
          <h4>To</h4>
          <input value={toDate} onChange={(ev) => setToDate(ev.target.value)} type="date" />
        </div>
        <div>
          <button onClick={onGetReport}>Download</button>
        </div>
      </Container>
    </StyledPopUp>
  );
}
