import React from "react";

import { AddButton } from "src/components/add-button/add-button";
import { Screen } from "src/components/screen/screen";
import { Text } from "src/components/text/text";
import { CryptoListContainer, HeaderContainer } from "./home-styles";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";

export const HomeScreen = () => {
  return (
    <Screen>
      <HeaderContainer>
        <Text size={20}>{"Crypto Tracker"}</Text>
        <AddButton />
      </HeaderContainer>
      <CryptoListContainer>
        <CryptoListItem />
      </CryptoListContainer>
    </Screen>
  );
};
