import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import { getCryptos } from "src/actions/get-cryptos";
import { AddButton } from "src/components/add-button/add-button";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { SearchCryptoSheet } from "src/components/search-cryptos-sheet/search-crypto-sheet";
import { Separator } from "src/components/separator/separator";
import { Text } from "src/components/text/text";
import { Crypto } from "src/entities/crypto";
import { useAppDispatch, useAppSelector } from "src/hooks/store-hook";
import { RootStackParamList } from "src/navigation/app-navigator";
import { addUserCrypto, removeUserCrypto } from "src/store/app/app-store";
import {
  CryptoBottomSheet,
  CryptoListContainer,
  HeaderContainer,
} from "./home-styles";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;

type Props = NavigationProps & {};

export const HomeScreen = ({ navigation, route }: Props) => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const userCryptos = useAppSelector((state) => state.app.userCryptos);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    dispatch(getCryptos());
  }, []);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  function openCryptoSearch() {
    bottomSheetRef.current?.expand();
  }

  const onDismiss = useCallback((crypto: Crypto) => {
    dispatch(removeUserCrypto(crypto));
    Toast.show("Crypto successfully removed", {
      position: Toast.positions.BOTTOM,
      duration: Toast.durations.SHORT,
    });
  }, []);

  function closeCryptoSearch() {
    setTimeout(() => {
      Keyboard.dismiss();
    }, 200);
    handleSearch("");

    bottomSheetRef.current?.forceClose();
  }

  function cryptoAlreadyTracked(crypto: Crypto) {
    return userCryptos.some((userCrypto) => userCrypto.id === crypto.id);
  }

  function onItemPress(crypto: Crypto) {
    if (cryptoAlreadyTracked(crypto)) {
      Toast.show("Crypto already tracked!", {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
      });
      return;
    }

    closeCryptoSearch();
    dispatch(addUserCrypto(crypto));
  }

  function onListItemPress(crypto: Crypto) {
    navigation.navigate("CryptoDetails", { id: crypto.id });
  }

  return (
    <Screen>
      <HeaderContainer>
        <Text size={20}>{"RN Crypto Tracker"}</Text>
        <AddButton onPress={openCryptoSearch} />
      </HeaderContainer>
      <CryptoListContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <Separator backgroundColor={theme.colors.secondaryDarkGray} />
          )}
          renderItem={(item) => (
            <CryptoListItem
              shouldSwipe
              onDismiss={onDismiss}
              onPress={onListItemPress}
              crypto={item.item}
            />
          )}
          data={userCryptos}
        />
      </CryptoListContainer>
      <CryptoBottomSheet ref={bottomSheetRef}>
        <SearchCryptoSheet
          searchValue={searchText}
          handleSearch={handleSearch}
          onItemPress={onItemPress}
          onClose={closeCryptoSearch}
        />
      </CryptoBottomSheet>
    </Screen>
  );
};
