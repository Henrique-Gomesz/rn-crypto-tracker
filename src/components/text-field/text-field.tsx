import React from "react";
import { BaseTextField } from "./text-field.styles";
import { useAppSelector } from "src/hooks/store-hook";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export const TextField = ({ onChangeText, placeholder, value }: Props) => {
  const theme = useAppSelector((state) => state.theme);

  return (
    <BaseTextField
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      borderColor={theme.colors.lightGray}
    />
  );
};
