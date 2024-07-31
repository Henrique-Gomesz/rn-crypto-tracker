import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import styled from "styled-components";

type BottomSheetProps = {
  handleColor: string;
};

export const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CryptoListContainer = styled(View)`
  margin-top: 32px;
  flex: 1;
`;

export const CryptoBottomSheet = styled(BottomSheet).attrs<BottomSheetProps>(
  ({ handleColor }) => ({
    enablePanDownToClose: false,
    snapPoints: ["95%"],
    enableHandlePanningGesture: false,
    enableContentPanningGesture: true,
  })
)<BottomSheetProps>``;
