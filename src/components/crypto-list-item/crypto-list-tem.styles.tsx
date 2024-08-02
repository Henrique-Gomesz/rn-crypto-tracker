import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { Text } from "../text/text";
import Animated from "react-native-reanimated";

export const ListItemContainer = styled(Animated.View)`
  justify-content: center;
`;

export const GestureContainer = styled(Animated.View)``;

export const Container = styled(TouchableOpacity)<{
  height: number;
  backgroundColor: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const LeadingItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex-shrink: 1;
`;

export const LeadingItemContentContainer = styled(View)`
  flex-shrink: 1;
`;

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

export const ActionsContainer = styled(Animated.View)<{ height: number }>`
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
`;
