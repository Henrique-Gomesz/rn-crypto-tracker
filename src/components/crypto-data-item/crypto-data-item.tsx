import React from "react";
import { Container, Title, Data } from "./crypto-data-item.styles";

type Props = {
  title: string;
  data: string;
};

export const CryptoDataItem = ({ data, title }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Data>{data}</Data>
    </Container>
  );
};
