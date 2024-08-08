import { ReactElement, useRef, useState } from "react";
import { CryptoBottomSheet } from "../screens/home-styles";
import { SearchCryptoSheet } from "src/components/search-cryptos-sheet/search-crypto-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from "src/hooks/store-hook";
import { addUserCrypto } from "src/store/app/app-store";
import Toast from "react-native-root-toast";
import { Crypto } from "src/entities/crypto";

type UseCryptoListBottomSheet = {
  renderBottomSheet: () => ReactElement;
  openBottomSheet: () => void;
};

export const useCryptoListBottomSheet = (): UseCryptoListBottomSheet => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const userCryptos = useAppSelector((state) => state.app.userCryptos);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  function cryptoAlreadyTracked(crypto: Crypto) {
    return userCryptos.some((userCrypto) => userCrypto.id === crypto.id);
  }

  function openCryptoSearch() {
    bottomSheetRef.current?.expand();
  }

  function onItemPress(crypto: Crypto) {
    if (cryptoAlreadyTracked(crypto)) {
      Toast.show("Crypto already tracked!", {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
      });
      return;
    }
    dispatch(addUserCrypto(crypto));
    Toast.show("Crypto successfully added!", {
      position: Toast.positions.BOTTOM,
      duration: 500,
    });
  }

  function closeCryptoSearch() {
    setTimeout(() => {
      Keyboard.dismiss();
    }, 200);
    handleSearch("");

    bottomSheetRef.current?.forceClose();
  }

  function renderBottomSheet(): ReactElement {
    return (
      <CryptoBottomSheet ref={bottomSheetRef}>
        <SearchCryptoSheet
          searchValue={searchText}
          handleSearch={handleSearch}
          onItemPress={onItemPress}
          onClose={closeCryptoSearch}
        />
      </CryptoBottomSheet>
    );
  }

  return {
    renderBottomSheet,
    openBottomSheet: openCryptoSearch,
  };
};
