import React, { useRef } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useEffect } from "react";

const Input = styled(Select)`
  border-radius: 3px;

  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: all 0.3s;
  & * {
    cursor: pointer;
    outline: none !important;
    border: none !important;
  }
`;

export default function SelectMultiple({ state, setState, options, selectRef }) {
  return <Input ref={selectRef} value={state} onChange={setState} options={options} isMulti />;
}
