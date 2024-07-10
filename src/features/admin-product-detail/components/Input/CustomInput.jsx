import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import cartesian from "../../utils/cartesian";

const Input = styled.input`
  padding: 8px;
  border-radius: 3px;
  width: 100%;

  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }

  &:active {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }
`;

const CustomInput = ({ state, setState, placeholder, list }) => {
  const [lastValidValue, setLastValidValue] = useState();
  const [isClear, setIsClear] = useState(false);
  const inputRef = useRef();

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (isClear) {
      newValue !== "";
      setIsClear(false);
      setState(newValue);
      setLastValidValue(newValue);
    }

    if (newValue !== "") {
      setState(newValue);
      setLastValidValue(newValue);
    } else {
      setIsClear(true);
    }
  };

  const handleBlur = () => {
    if (isClear) {
      setIsClear(false);
      setState(lastValidValue);
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={isClear ? "" : state}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
