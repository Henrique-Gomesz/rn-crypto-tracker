import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

export const ScreenContainer = styled(SafeAreaView)<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  padding: 16px;
  flex: 1;
`;
