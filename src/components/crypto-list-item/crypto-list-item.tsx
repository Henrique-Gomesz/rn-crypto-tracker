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

export const CryptoListItem = () => {
  return (
    <Container>
      <LeadingItemContainer>
        <Image
          style={{ width: 52, height: 52 }}
          source={{
            uri: "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png",
          }}
          contentFit="cover"
        />
        <LeadingItemContentContainer>
          <LeadingItemTitle>{"Bitcoin"}</LeadingItemTitle>
          <LeadingItemSubtitle>{"BTC"}</LeadingItemSubtitle>
        </LeadingItemContentContainer>
      </LeadingItemContainer>
      <TrailingItemContentContainer>
        <TrailingItemTitle>{"$1500,00"}</TrailingItemTitle>
        <TrailingItemSubtitle>{"1%"}</TrailingItemSubtitle>
      </TrailingItemContentContainer>
    </Container>
  );
};
