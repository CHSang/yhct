import { Input } from "antd";
import styled from "styled-components";

type InputFieldProps = {
  id: string;
  placeholder?: string;
  value: any;
  type: "email" | "password" | "text" | "number";
  onChange: Function;
};

const InputFieldWrapper = styled(Input)`
  font-size: 5vmin;
  margin-bottom: 5vmin;
  height: 12vmin;

  &:focus {
    border-color: green;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(33 168 61 / 20%);
  }
`;

const InputPasswordFieldWrapper = styled(Input.Password)`
  font-size: 5vmin !important;
  margin-bottom: 5vmin !important;
  height: 12vmin !important;

  &:focus,
  &:hover {
    border-color: green !important;
    border-right-width: 1px !important;
    outline: 0 !important;
    box-shadow: 0 0 0 2px rgb(33 168 61 / 20%) !important;
  }
`;

const InputField = ({
  id,
  placeholder,
  value,
  type,
  onChange,
}: InputFieldProps) => {
  return (
    <>
      {type !== "password" && (
        <InputFieldWrapper
          id={id}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={(e) => onChange(e)}
          size="large"
        />
      )}

      {type === "password" && (
        <InputPasswordFieldWrapper
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          size="large"
        />
      )}
    </>
  );
};

export default InputField;
