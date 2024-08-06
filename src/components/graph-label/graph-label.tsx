import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { USDollarFormatter } from "src/utils/constants";
import { Text } from "../text/text";

type Props = {
  value: number;
  index: number;
  arrayLength: number;
  textColor: string;
};

export const GraphLabel = ({ arrayLength, index, textColor, value }: Props) => {
  const location =
    (index / arrayLength) * (Dimensions.get("window").width - 40) || 0;
  const translateX = useSharedValue(0);

  const ContainerStyled = useAnimatedStyle(() => {
    translateX.value = withTiming(Math.max(location - 40, 5));

    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={ContainerStyled}>
      <Text color={textColor}>{USDollarFormatter.format(value)}</Text>
    </Animated.View>
  );
};
