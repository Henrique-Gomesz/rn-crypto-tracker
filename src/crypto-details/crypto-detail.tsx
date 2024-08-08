import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { CryptoDataItem } from "src/components/crypto-data-item/crypto-data-item";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { useAppSelector } from "src/hooks/store-hook";
import { useUpdateCryptoRoutines } from "src/hooks/update-crypto-routines-hook";
import { RootStackParamList } from "src/navigation/app-navigator";
import { DEFAULT_CRYPTO, USDollarFormatter } from "src/utils/constants";
import {
  CryptoDataContainer,
  CryptoDataItemScrollView,
  CryptoDataSectionTitle,
} from "./crypto-details.styles";
import { useCryptoGraph } from "./hooks/use-crypto-graph";
import { useCryptoHistory } from "./hooks/use-crypto-history";

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "CryptoDetails"
>;

type Props = NavigationProps & {};

export const CryptoDetailsScreen = ({ navigation, route }: Props) => {
  const crypto =
    useAppSelector((state) =>
      state.app.cryptos.find((crypto) => crypto.id === route.params.id)
    ) ?? DEFAULT_CRYPTO;

  const { fetchCryptoHistory, history, isLoading } = useCryptoHistory({
    cryptoId: crypto.id,
  });

  const { startUpdateCryptoRoutine, clearRoutines } = useUpdateCryptoRoutines();

  const { displayGraph, selectedInterval } = useCryptoGraph({
    crypto,
    history,
    isLoading,
    onChangeInterval: onGraphIntervalChange,
  });

  useEffect(() => {
    fetchCryptoHistory(selectedInterval);
    startUpdateCryptoRoutine(crypto.id);
  }, []);

  const goBack = useCallback(() => {
    clearRoutines();
    navigation.goBack();
  }, []);

  function onGraphIntervalChange(interval: string) {
    fetchCryptoHistory(interval);
  }

  return (
    <Screen
      shouldDismissKeyboard={false}
      HeaderContent={
        <CryptoListItem showTrailingContent={false} crypto={crypto} />
      }
      onGoBack={goBack}
      withHeader
    >
      {displayGraph()}
      <CryptoDataContainer>
        <CryptoDataSectionTitle>
          {"Crypto Market Details (24h)"}
        </CryptoDataSectionTitle>
        <CryptoDataItemScrollView showsVerticalScrollIndicator={false}>
          <CryptoDataItem
            data={USDollarFormatter.format(crypto.marketCapUsd)}
            title="Market Cap"
          />
          <CryptoDataItem
            data={USDollarFormatter.format(crypto.volumeUsd24Hr)}
            title="Volume"
          />
          <CryptoDataItem
            data={USDollarFormatter.format(crypto.supply)}
            title="Total Supply"
          />
          {crypto.maxSupply && (
            <CryptoDataItem
              data={USDollarFormatter.format(crypto.maxSupply)}
              title="Max Supply"
            />
          )}
          <CryptoDataItem
            data={USDollarFormatter.format(crypto.vwap24Hr)}
            title="VWAP"
          />
        </CryptoDataItemScrollView>
      </CryptoDataContainer>
    </Screen>
  );
};
