import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { isEqual } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GraphPoint, LineGraph } from "react-native-graph";
import { fetchCryptoHistory as fetchCryptoHistoryApi } from "src/api/get-cryptos-history";
import { Button } from "src/components/button/button";
import { CryptoDataItem } from "src/components/crypto-data-item/crypto-data-item";
import { CryptoListItem } from "src/components/crypto-list-item/crypto-list-item";
import { Screen } from "src/components/screen/screen";
import { Text } from "src/components/text/text";
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
import { GraphLabel } from "src/components/graph-label/graph-label";
import { percentFormatter, USDollarFormatter } from "src/utils/constants";

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

const GRAPH_INTERVALS = ["m1", "m15", "h1", "h2", "h6", "d1"];

export const CryptoDetailsScreen = ({ navigation, route }: Props) => {
  const theme = useAppSelector((state) => state.theme);
  const [cryptoHistoryData, setCryptoHistoryData] = useState<CryptoHistory[]>(
    []
  );
  const crypto =
    useAppSelector((state) =>
      state.app.cryptos.find((crypto) => crypto.id === route.params.id)
    ) ?? DEFAULT_CRYPTO;

  const [currencyValue, setCurrencyValue] = useState(crypto.priceUsd);

  const [selectedInterval, setSelectedInterval] = useState("d1");

  useEffect(() => {
    fetchCryptoHistory();
  }, [crypto]);

  const fetchCryptoHistory = useCallback((interval?: string): void => {
    fetchCryptoHistoryApi(crypto.id, interval)
      .then((data) => {
        setCryptoHistoryData(data);
      })
      .catch(() => {
        setCryptoHistoryData([]);
      });
  }, []);

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

  const onGestureEnd = useCallback(() => {
    setCurrencyValue(crypto.priceUsd);
  }, []);

  const onPointerSelected = (point: GraphPoint) => {
    setCurrencyValue(point.value);
  };

  const points = useMemo(
    () =>
      cryptoHistoryData.map((item) => {
        return {
          date: item.date,
          value: Number(item.priceUsd),
        };
      }),
    [cryptoHistoryData]
  );

  const maxValue = useMemo(() => {
    const value = Math.max(...points.map((item) => item.value));
    const index = points.findIndex((item) => item.value === value);

    return {
      value,
      index,
    };
  }, [cryptoHistoryData]);

  const minValue = useMemo(() => {
    const value = Math.min(...points.map((item) => item.value));
    const index = points.findIndex((item) => item.value === value);

    return {
      value,
      index,
    };
  }, [cryptoHistoryData]);

  useEffect(() => {
    setTimeout(() => {
      setCurrencyValue(crypto.priceUsd);
    }, 100);
  }, [cryptoHistoryData]);

  const renderGraph = useCallback(() => {
    return (
      <LineGraph
        gradientFillColors={[
          theme.colors.darkGreen,
          theme.colors.darkGreen,
          theme.colors.darkGray,
        ]}
        TopAxisLabel={() => (
          <GraphLabel
            arrayLength={points.length}
            index={maxValue.index}
            textColor={theme.colors.lightGreen}
            value={maxValue.value}
          />
        )}
        BottomAxisLabel={() => (
          <GraphLabel
            arrayLength={points.length}
            index={minValue.index}
            textColor={theme.colors.red}
            value={minValue.value}
          />
        )}
        onPointSelected={onPointerSelected}
        onGestureEnd={onGestureEnd}
        panGestureDelay={50}
        enableFadeInMask
        style={{
          alignSelf: "center",
          width: "100%",
          aspectRatio: 1.4,
        }}
        points={points}
        enablePanGesture={true}
        enableIndicator
        animated={true}
        indicatorPulsating
        color={theme.colors.lightGreen}
      />
    );
  }, [points]);

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
        <Price>{USDollarFormatter.format(currencyValue)}</Price>
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
      {renderGraph()}
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
