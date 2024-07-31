import React from "react";
import { Container } from "./separator.styles";

type Props = {
  backgroundColor: string;
};

export const Separator = ({ backgroundColor }: Props) => {
  return <Container backgroundColor={backgroundColor}></Container>;
};
