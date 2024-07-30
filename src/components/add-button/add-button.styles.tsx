import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export const ButtonContainer = styled(TouchableOpacity)<{
  borderColor: string;
}>`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props) => props.borderColor};
  border-radius: 6px;
  padding: 0px 10px;
`;
