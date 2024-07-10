import styled from "styled-components";
import { useEffect, useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import dchc from "@/shared/data/dchc";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";

// animation icon
import AlertIcon from "@/shared/components/AnimationIcon/AlertIcon";
import ErrorIcon from "@/shared/components/AnimationIcon/ErrorIcon";
import SuccessIcon from "@/shared/components/AnimationIcon/SuccessIcon";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";

// popup
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import PopUp from "@/shared/components/PopUp/PopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";

// react-icon
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const ReactIcon = styled.div``;

const PopUps = styled.div``;

const StyledFaRegArrowAltCircleRight = styled(FaRegArrowAltCircleRight)`
  height: 100px;
  width: 100px;
  color: red;
`;

const SelectContainer = styled.div`
  margin: 5rem;
`;

const InputContainer = styled.div`
  margin: 5rem;
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function Test() {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [city, setCity] = useState("01");
  const [district, setDistrict] = useState("");

  const [textInputState, setTextInputState] = useState("");

  useEffect(() => {
    setDistrict("1");
  }, [city]);

  return <Container></Container>;
}
