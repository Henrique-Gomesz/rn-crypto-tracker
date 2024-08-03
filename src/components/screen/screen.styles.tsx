import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

export const ScreenContainer = styled(SafeAreaView)<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  padding: 16px;
  flex: 1;
`;

export const HeaderContainer = styled(View)`
  align-items: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const IconContainer = styled(TouchableOpacity)``;

export const HeaderContentContainer = styled(View)`
  justify-content: center;
  background-color: red;
`;
