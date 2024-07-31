import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { getCryptos } from "src/actions/get-cryptos";
import { AddButton } from "src/components/add-button/add-button";
import { Screen } from "src/components/screen/screen";
import { SearchCryptoSheet } from "src/components/search-cryptos-sheet/search-crypto-sheet";
import { Text } from "src/components/text/text";
import { useAppDispatch, useAppSelector } from "src/hooks/store-hook";
import {
  CryptoBottomSheet,
  CryptoListContainer,
  HeaderContainer,
} from "./home-styles";
import { addUserCrypto } from "src/store/app/app-store";
import { Crypto } from "src/entities/crypto";
import { FlatList } from "react-native";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Separator } from "src/components/separator/separator";

export const HomeScreen = () => {
  const theme = useAppSelector((state) => state.theme);
  const userCryptos = useAppSelector((state) => state.app.userCryptos);

  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    dispatch(getCryptos());
  }, []);

  function onItemPress(crypto: Crypto) {
    dispatch(addUserCrypto(crypto));
    closeCryptoSearch();
  }

  function openCryptoSearch() {
    bottomSheetRef.current?.expand();
  }

  function closeCryptoSearch() {
    bottomSheetRef.current?.close();
  }

  return (
    <Screen>
      <HeaderContainer>
        <Text size={20}>{"Crypto Tracker"}</Text>
        <AddButton onPress={openCryptoSearch} />
      </HeaderContainer>
      <CryptoListContainer>
        <FlatList
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <Separator backgroundColor={theme.colors.secondaryDarkGray} />
          )}
          renderItem={(item) => (
            <CryptoListItem
              onPress={(item) => console.log("my crypto", item)}
              crypto={item.item}
            />
          )}
          data={userCryptos}
        />
      </CryptoListContainer>
      <CryptoBottomSheet
        handleColor={theme.colors.darkGray}
        ref={bottomSheetRef}
      >
        <SearchCryptoSheet
          onItemPress={onItemPress}
          onClose={closeCryptoSearch}
        />
      </CryptoBottomSheet>
    </Screen>
  );
};
