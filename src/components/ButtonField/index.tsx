import { Button } from "antd";
import styled from "styled-components";

type ButtonFieldProps = {
  onClick: Function;
  disabled?: boolean;
  label: string;
  type?: "link" | "text" | "default" | "ghost" | "primary" | "dashed" | undefined;
  transparent?: boolean;
};

const ButtonFieldWrapper = styled(Button)`
  text-align: center;
  color: green;
  font-size: 5vmin;
  width: fit-content;
  height: fit-content;
  padding: 2vmin 15vmin;
  font-weight: bold;
  background: green;
  color: white;

  &:hover,
  &:active,
  &:visited {
    background: green;
    color: white;
  }

  &.transparent{
    background: transparent !important;
    color: green !important;
    border: 1px solid green !important;

    &:hover,
    &:active,
    &:visited {
      color: green;
      border: 1px solid green !important;
    }
  }

  &:disabled {
    outline: none;
    border: none !important;
  }
`;

const ButtonField = ({ onClick, disabled, label, type, transparent }: ButtonFieldProps) => {
  return (
    <ButtonFieldWrapper
      onClick={() => onClick()}
      disabled={disabled}
      className={transparent ? "transparent" : ""}
      type={type}
      size="large"
    >
      {label}
    </ButtonFieldWrapper>
  );
};

export default ButtonField;
