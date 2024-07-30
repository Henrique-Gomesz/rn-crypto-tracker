import { View } from "react-native";
import styled from "styled-components";
import { Text } from "../text/text";

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LeadingItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const LeadingItemContentContainer = styled(View)``;

export const LeadingItemTitle = styled(Text)``;

export const LeadingItemSubtitle = styled(Text).attrs({
  size: 12,
})``;

export const TrailingItemContentContainer = styled(View)`
  align-content: flex-end;
`;

export const TrailingItemTitle = styled(Text)``;

export const TrailingItemSubtitle = styled(Text).attrs({
  size: 12,
  textAlign: "right",
})``;
