import React, { FC } from "react";
import { Paragraph } from "./paragraph";
import { StyledInput } from "../styles";

interface InputProps {
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
  placeholder: string;
  type: "text" | "search" | "submit";
}

export const Input: FC<InputProps> = ({
  onChange,
  placeholder,
  type,
  onSubmit,
}) => {
  return (
    <form>
      <Paragraph weight="light">{placeholder}</Paragraph>
      <StyledInput type={type} onChange={onChange} onSubmit={onSubmit} />
    </form>
  );
};

export default Input;
