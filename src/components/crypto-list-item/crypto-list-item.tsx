import { Image, ImageSource } from "expo-image";
import React from "react";
import { Crypto } from "src/entities/crypto";
import { getImageUrlBySymbol } from "src/utils/get-image-name";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useAssets } from "expo-asset";
import { isEmpty, isNil, noop } from "lodash";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppSelector } from "src/hooks/store-hook";
import {
  percentFormatter,
  SCREEN_WIDTH,
  USDollarFormatter,
} from "src/utils/constants";
import { ListItemAction } from "../list-item-action/list-item-action";
import {
  ActionsContainer,
  Container,
  GestureContainer,
  LeadingItemContainer,
  LeadingItemContentContainer,
  LeadingItemSubtitle,
  LeadingItemTitle,
  ListItemContainer,
  SelectedIconContainer,
  TrailingItemContentContainer,
  TrailingItemSubtitle,
  TrailingItemTitle,
} from "./crypto-list-tem.styles";
import { useCryptoListItemAnimation } from "./hooks/use-crypto-list-item-animation";

type Props = {
  crypto: Crypto;
  onPress?: (crypto: Crypto) => void;
  textColor?: string;
  onDismiss?: (crypto: Crypto) => void;
  backgroundColor?: string;
  shouldSwipe?: boolean;
  showTrailingContent?: boolean;
  isSelected?: boolean;
};

const ITEM_HEIGHT = 70;

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

export const CryptoListItem = ({
  crypto,
  onPress,
  textColor,
  onDismiss,
  backgroundColor,
  shouldSwipe = false,
  showTrailingContent = true,
  isSelected = false,
}: Props) => {
  const theme = useAppSelector((state) => state.theme);
  const [assets] = useAssets([require("src/assets/images/icon.png")]);

  const {
    animatedIconContainerStyle,
    animatedItemContainerStyle,
    animatedStyle,
    tap,
  } = useCryptoListItemAnimation(crypto, shouldSwipe, onDismiss ?? noop);

  function getImageSource(): ImageSource | string {
    const imageSource = {
      uri: getImageUrlBySymbol(crypto.symbol),
    };

    if (isEmpty(imageSource.uri)) {
      if (assets) {
        return assets[0].uri;
      }
      return "";
    }

    return imageSource;
  }

  return (
    <ListItemContainer style={animatedItemContainerStyle}>
      <ActionsContainer style={animatedIconContainerStyle} height={ITEM_HEIGHT}>
        <ListItemAction
          color={theme.colors.red}
          name="delete-outline"
          size={24}
        />
      </ActionsContainer>
      <GestureDetector gesture={tap}>
        <GestureContainer style={animatedStyle}>
          <Container
            backgroundColor={backgroundColor ?? theme.colors.darkGray}
            height={ITEM_HEIGHT}
            disabled={isNil(onPress)}
            onPress={() => {
              if (onPress) onPress(crypto);
            }}
          >
            <LeadingItemContainer>
              <Image
                cachePolicy={"disk"}
                style={{ width: 52, height: 52 }}
                source={getImageSource()}
                contentFit="cover"
              />
              <LeadingItemContentContainer>
                <LeadingItemTitle color={textColor}>
                  {crypto.name}
                </LeadingItemTitle>
                <LeadingItemSubtitle color={textColor}>
                  {crypto.symbol}
                </LeadingItemSubtitle>
              </LeadingItemContentContainer>
            </LeadingItemContainer>
            {showTrailingContent && (
              <TrailingItemContentContainer>
                <TrailingItemTitle color={textColor}>
                  {USDollarFormatter.format(crypto.priceUsd)}
                </TrailingItemTitle>
                <TrailingItemSubtitle
                  color={
                    crypto.changePercent24Hr > 0
                      ? theme.colors.lightGreen
                      : theme.colors.red
                  }
                >
                  {`${percentFormatter.format(crypto.changePercent24Hr)}%`}
                </TrailingItemSubtitle>
                {isSelected && (
                  <SelectedIconContainer>
                    <MaterialIcons
                      name="check"
                      color={theme.colors.lightGreen}
                      size={24}
                    />
                  </SelectedIconContainer>
                )}
              </TrailingItemContentContainer>
            )}
          </Container>
        </GestureContainer>
      </GestureDetector>
    </ListItemContainer>
  );
};
