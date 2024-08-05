import { ScrollView, View } from "react-native";
import { Text } from "src/components/text/text";
import styled from "styled-components";

export const GraphContainer = styled(View)`
  flex: 1;
`;

export const PriceContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Price = styled(Text).attrs({
  size: 24,
})``;

export const ChangePercent = styled(Text)``;

export const GraphButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

export const CryptoDataSectionTitle = styled(Text).attrs({
  size: 24,
})``;

export const CryptoDataContainer = styled(View)`
  flex: 1;
  margin-top: 16px;
`;

export const CryptoDataItemScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    gap: 16,
  },
})`
  flex: 1;
  margin-top: 16px;
`;
