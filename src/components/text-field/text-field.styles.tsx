import { TextInput } from "react-native";
import styled from "styled-components";

export const BaseTextField = styled(TextInput)<{ borderColor: string }>`
  border: 1px;
  border-radius: 8px;
  border-color: ${(props) => props.borderColor};
  font-size: 16px;
  padding: 8px;
`;
