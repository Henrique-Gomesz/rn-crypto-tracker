import React from "react";
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

import { Image } from "expo-image";
import { Crypto } from "src/entities/crypto";
import { getImageUrlByName } from "src/utils/get-image-name";
type Props = {
  crypto: Crypto;
  onPress: (crypto: Crypto) => void;
  textColor?: string;
};

export const CryptoListItem = ({ crypto, onPress, textColor }: Props) => {
  return (
    <Container onPress={() => onPress(crypto)}>
      <LeadingItemContainer>
        <Image
          cachePolicy={"disk"}
          style={{ width: 52, height: 52 }}
          source={{
            uri: getImageUrlByName(crypto.name),
          }}
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
          {crypto.priceUsd}
        </TrailingItemTitle>
        <TrailingItemSubtitle color={textColor}>
          {crypto.changePercent24Hr}
        </TrailingItemSubtitle>
      </TrailingItemContentContainer>
    </Container>
  );
};
