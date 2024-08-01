import { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { Text } from "../text/text";

export const Container = styled(BottomSheetView)<{ backgroundColor: string }>`
  flex: 1;
  padding: 0px 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const IconContainer = styled(TouchableOpacity)``;

export const TitleContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
`;

export const Title = styled(Text).attrs({
  size: 24,
})``;

export const TextFieldContainer = styled(View)`
  margin-top: 16px;
`;

export const CryptoListContainer = styled(View)`
  margin-top: 24px;
  margin-bottom: 24px;
  flex: 1;
`;

export const CryptoList = styled(FlatList)``;
