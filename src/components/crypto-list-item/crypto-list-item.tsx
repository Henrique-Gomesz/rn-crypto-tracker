import { Image, ImageSource } from "expo-image";
import React from "react";
import { Crypto } from "src/entities/crypto";
import { getImageUrlBySymbol } from "src/utils/get-image-name";

import {
  Container,
  LeadingItemContainer,
  LeadingItemContentContainer,
  LeadingItemSubtitle,
  LeadingItemTitle,
  TrailingItemContentContainer,
  TrailingItemSubtitle,
  TrailingItemTitle,
} from "./crypto-list-tem.styles";
import { useAssets } from "expo-asset";
import { isEmpty } from "lodash";
import { useAppSelector } from "src/hooks/store-hook";

type Props = {
  crypto: Crypto;
  onPress: (crypto: Crypto) => void;
  textColor?: string;
};

const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
});

export const CryptoListItem = ({ crypto, onPress, textColor }: Props) => {
  const theme = useAppSelector((state) => state.theme);
  const [assets] = useAssets([require("src/assets/images/icon.png")]);

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
    <Container onPress={() => onPress(crypto)}>
      <LeadingItemContainer>
        <Image
          cachePolicy={"disk"}
          style={{ width: 52, height: 52 }}
          source={getImageSource()}
          contentFit="cover"
        />
        <LeadingItemContentContainer>
          <LeadingItemTitle color={textColor}>{crypto.name}</LeadingItemTitle>
          <LeadingItemSubtitle color={textColor}>
            {crypto.symbol}
          </LeadingItemSubtitle>
        </LeadingItemContentContainer>
      </LeadingItemContainer>
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
      </TrailingItemContentContainer>
    </Container>
  );
};
