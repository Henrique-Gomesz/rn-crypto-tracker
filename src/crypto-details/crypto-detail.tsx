import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { LineGraph } from "react-native-graph";
import { fetchCryptoHistory } from "src/api/get-cryptos-history";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { Text } from "src/components/text/text";
import { Crypto } from "src/entities/crypto";
import { CryptoHistory } from "src/entities/crypto-history";
import { useAppSelector } from "src/hooks/store-hook";
import { RootStackParamList } from "src/navigation/app-navigator";
import { GraphContainer } from "./crypto-details.styles";

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

export const CryptoDetailsScreen = ({ navigation, route }: Props) => {
  const theme = useAppSelector((state) => state.theme);
  const [cryptoHistoryData, setCryptoHistoryData] = useState<CryptoHistory[]>(
    []
  );

  const crypto =
    useAppSelector((state) =>
      state.app.cryptos.find((crypto) => crypto.id === route.params.id)
    ) ?? DEFAULT_CRYPTO;

  useEffect(() => {
    fetchCryptoHistory(crypto.id).then((data) => {
      setCryptoHistoryData(data);
    });
  }, [crypto]);

  return (
    <Screen
      HeaderContent={
        <CryptoListItem showTrailingContent={false} crypto={crypto} />
      }
      onGoBack={() => navigation.goBack()}
      withHeader
    >
      <LineGraph
        style={{ flex: 1 }}
        points={cryptoHistoryData.map((item) => {
          return {
            date: item.date,
            value: Number(item.priceUsd),
          };
        })}
        animated={true}
        color={theme.colors.lightGreen}
      />
      <GraphContainer>
        <Text>test</Text>
      </GraphContainer>
    </Screen>
  );
};
