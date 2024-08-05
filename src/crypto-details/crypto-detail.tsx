import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { LineGraph } from "react-native-graph";
import { fetchCryptoHistory as fetchCryptoHistoryApi } from "src/api/get-cryptos-history";
import { Button } from "src/components/button/button";
import { CryptoDataItem } from "src/components/crypto-data-item/crypto-data-item";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { Crypto } from "src/entities/crypto";
import { CryptoHistory } from "src/entities/crypto-history";
import { useAppSelector } from "src/hooks/store-hook";
import { RootStackParamList } from "src/navigation/app-navigator";
import {
  ChangePercent,
  CryptoDataContainer,
  CryptoDataItemScrollView,
  CryptoDataSectionTitle,
  GraphButtonsContainer,
  Price,
  PriceContainer,
} from "./crypto-details.styles";
import { isEqual } from "lodash";

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "CryptoDetails"
>;

type Props = NavigationProps & {};

const DEFAULT_CRYPTO: Crypto = {
  id: "",
  symbol: "",
  name: "",
  supply: 0,
  maxSupply: 0,
  marketCapUsd: 0,
  volumeUsd24Hr: 0,
  priceUsd: 0,
  changePercent24Hr: 0,
  vwap24Hr: 0,
  explorer: "",
};

const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 2,
});

const GRAPH_INTERVALS = ["h1", "h6", "h12", "d1"];

export const CryptoDetailsScreen = ({ navigation, route }: Props) => {
  const theme = useAppSelector((state) => state.theme);
  const [cryptoHistoryData, setCryptoHistoryData] = useState<CryptoHistory[]>(
    []
  );

  const [selectedInterval, setSelectedInterval] = useState("d1");

  const crypto =
    useAppSelector((state) =>
      state.app.cryptos.find((crypto) => crypto.id === route.params.id)
    ) ?? DEFAULT_CRYPTO;

  useEffect(() => {
    fetchCryptoHistory();
  }, [crypto]);

  function fetchCryptoHistory(interval?: string): void {
    fetchCryptoHistoryApi(crypto.id, interval)
      .then((data) => {
        setCryptoHistoryData(data);
      })
      .catch(() => {
        setCryptoHistoryData([]);
      });
  }

  useEffect(() => {
    console.log(selectedInterval);
  }, [selectedInterval]);

  const onClickGraphButton = useCallback(
    (interval: string) => {
      if (!isEqual(interval, selectedInterval)) {
        setSelectedInterval(interval);
        fetchCryptoHistory(interval);
      }
    },
    [selectedInterval]
  );

  const renderGraphButtons = useCallback(() => {
    return GRAPH_INTERVALS.map((interval) => (
      <Button
        backgroundColor={
          isEqual(interval, selectedInterval) ? "gray" : undefined
        }
        key={interval}
        onPress={() => onClickGraphButton(interval)}
        size={18}
        text={interval.toUpperCase()}
      />
    ));
  }, [selectedInterval]);

  return (
    <Screen
      shouldDismissKeyboard={false}
      HeaderContent={
        <CryptoListItem showTrailingContent={false} crypto={crypto} />
      }
      onGoBack={() => navigation.goBack()}
      withHeader
    >
      <PriceContainer>
        <Price>{USDollarFormatter.format(crypto.priceUsd)}</Price>
        <ChangePercent
          color={
            crypto.changePercent24Hr > 0
              ? theme.colors.lightGreen
              : theme.colors.red
          }
        >
          {`${percentFormatter.format(
            crypto.changePercent24Hr
          )}% (${selectedInterval})`}
        </ChangePercent>
      </PriceContainer>
      <LineGraph
        style={{
          alignSelf: "center",
          width: "100%",
          aspectRatio: 1.4,
        }}
        points={cryptoHistoryData.map((item) => {
          return {
            date: item.date,
            value: Number(item.priceUsd),
          };
        })}
        enablePanGesture={true}
        enableIndicator
        animated={true}
        indicatorPulsating
        color={theme.colors.lightGreen}
      />
      <GraphButtonsContainer>{renderGraphButtons()}</GraphButtonsContainer>
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
