import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import styled from "styled-components";

export const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CryptoListContainer = styled(View)`
  margin-top: 32px;
  flex: 1;
`;

export const CryptoBottomSheet = styled(BottomSheet).attrs(() => ({
  enablePanDownToClose: false,
  index: -1,
  snapPoints: ["95%"],
  enableHandlePanningGesture: false,
  enableContentPanningGesture: false,
}))``;
