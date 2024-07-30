import { Text } from "react-native";
import styled from "styled-components";

export const BaseText = styled(Text)<{
  color: string;
  size: number;
  fontFamily: string;
}>`
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
  font-family: ${(props) => props.fontFamily};
`;
