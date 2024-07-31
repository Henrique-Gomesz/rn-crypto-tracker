import { View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  height: 2px;
  margin: 16px 0px;
`;
