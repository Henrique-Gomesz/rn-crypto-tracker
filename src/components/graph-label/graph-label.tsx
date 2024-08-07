import React, { useMemo } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_WIDTH, USDollarFormatter } from "src/utils/constants";
import { Text } from "../text/text";

type Props = {
  value: number;
  index: number;
  arrayLength: number;
  textColor: string;
};

export const GraphLabel: React.FC<Props> = ({
  arrayLength,
  index,
  textColor,
  value,
}) => {
  const elementWidth = 120;

  const initialLocation = useMemo(() => {
    return (index / arrayLength) * SCREEN_WIDTH;
  }, []);

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    let adjustedLocation = initialLocation - elementWidth / 2;

    if (adjustedLocation < 0) {
      adjustedLocation = 0;
    } else if (adjustedLocation + elementWidth > SCREEN_WIDTH) {
      adjustedLocation = SCREEN_WIDTH - elementWidth;
    }

    translateX.value = withTiming(adjustedLocation);

    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, { width: elementWidth }]}>
      <Text color={textColor}>{USDollarFormatter.format(value)}</Text>
    </Animated.View>
  );
};
