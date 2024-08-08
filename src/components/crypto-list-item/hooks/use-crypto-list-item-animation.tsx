import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Crypto } from "src/entities/crypto";
import { SCREEN_WIDTH } from "src/utils/constants";

const ITEM_HEIGHT = 70;

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

type UseCryptoListItemAnimation = {
  tap: ReturnType<typeof Gesture.Pan>;
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  animatedIconContainerStyle: ReturnType<typeof useAnimatedStyle>;
  animatedItemContainerStyle: ReturnType<typeof useAnimatedStyle>;
};

export const useCryptoListItemAnimation = (
  crypto: Crypto,
  shouldSwipe: boolean,
  onDismiss: (crypto: Crypto) => void
): UseCryptoListItemAnimation => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ITEM_HEIGHT);

  const tap = Gesture.Pan()
    .failOffsetY([-5, 5])
    .activeOffsetX([-5, 5])
    .onUpdate((event) => {
      if (event.translationX < 0 && shouldSwipe)
        translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldDismiss = translateX.value < TRANSLATE_X_THRESHOLD;

      if (shouldDismiss) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(crypto);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return {
      opacity,
      height: itemHeight.value,
    };
  });

  const animatedItemContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
    };
  });

  return {
    tap,
    animatedStyle,
    animatedIconContainerStyle,
    animatedItemContainerStyle,
  };
};
