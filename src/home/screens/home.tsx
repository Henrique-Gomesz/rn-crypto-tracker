import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import Toast from "react-native-root-toast";
import { Button } from "src/components/button/button";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { Separator } from "src/components/separator/separator";
import { Text } from "src/components/text/text";
import { Crypto } from "src/entities/crypto";
import { useAppDispatch, useAppSelector } from "src/hooks/store-hook";
import { useUpdateCryptoRoutines } from "src/hooks/update-crypto-routines-hook";
import { RootStackParamList } from "src/navigation/app-navigator";
import { removeUserCrypto } from "src/store/app/app-store";
import { useCryptoListBottomSheet } from "../hooks/use-crypto-list-bottom-sheet";
import { CryptoListContainer, HeaderContainer } from "./home-styles";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;

type Props = NavigationProps & {};

export const HomeScreen = ({ navigation }: Props) => {
  const { startGetCryptosRoutine, clearRoutines } = useUpdateCryptoRoutines();
  const { openBottomSheet, renderBottomSheet } = useCryptoListBottomSheet();

  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const userCryptos = useAppSelector((state) => state.app.userCryptos);

  useEffect(() => {
    navigation.addListener("focus", () => {
      startGetCryptosRoutine();
    });

    return () => {
      clearRoutines();
    };
  }, []);

  const onDismiss = useCallback((crypto: Crypto) => {
    dispatch(removeUserCrypto(crypto));
    Toast.show("Crypto successfully removed", {
      position: Toast.positions.BOTTOM,
      duration: Toast.durations.SHORT,
    });
  }, []);

  function onListItemPress(crypto: Crypto) {
    clearRoutines();
    navigation.navigate("CryptoDetails", { id: crypto.id });
  }

  return (
    <Screen>
      <HeaderContainer>
        <Text size={20}>{"RN Crypto Tracker"}</Text>
        <Button text="+" onPress={openBottomSheet} />
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
      {renderBottomSheet()}
    </Screen>
  );
};
