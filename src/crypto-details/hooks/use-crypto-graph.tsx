import { first, isEmpty, isEqual, last, min } from "lodash";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { GraphPoint, LineGraph } from "react-native-graph";
import { Button } from "src/components/button/button";
import { GraphLabel } from "src/components/graph-label/graph-label";
import { Crypto } from "src/entities/crypto";
import { CryptoHistory } from "src/entities/crypto-history";
import { useAppSelector } from "src/hooks/store-hook";
import {
  ChangePercent,
  GraphButtonsContainer,
  LoadingContainer,
  Price,
  PriceContainer,
} from "../crypto-details.styles";
import { Loading } from "src/components/loading/loading";
import { percentFormatter, USDollarFormatter } from "src/utils/constants";

const GRAPH_BUTTON_LABEL_MAPPER = new Map<string, string>([
  ["m1", "1d"],
  ["m15", "1w"],
  ["h1", "1m"],
  ["h6", "6m"],
  ["d1", "1y"],
]);

type Props = {
  history: CryptoHistory[];
  crypto: Crypto;
  onChangeInterval: (interval: string) => void;
  isLoading: boolean;
};

type UseCryptoGraph = {
  selectedInterval: string;
  displayGraph: () => ReactElement;
};

export const useCryptoGraph = ({
  crypto,
  onChangeInterval,
  history,
  isLoading,
}: Props): UseCryptoGraph => {
  const theme = useAppSelector((state) => state.theme);
  const [currencyValue, setCurrencyValue] = useState(crypto.priceUsd);
  const [selectedInterval, setSelectedInterval] = useState("m1");

  const onClickGraphButton = useCallback(
    (interval: string) => {
      if (!isEqual(interval, selectedInterval)) {
        setSelectedInterval(interval);
        onChangeInterval(interval);
      }
    },
    [selectedInterval]
  );

  const points = useMemo(
    () =>
      history
        .map((item) => {
          return {
            date: item.date,
            value: Number(item.priceUsd),
          };
        })
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    [history]
  );

  useEffect(() => {
    setTimeout(() => {
      setCurrencyValue(crypto.priceUsd);
    }, 100);
  }, [history]);

  const changePercent = useMemo(() => {
    const firstValue = first(points)?.value ?? 1;
    const lastValue = last(points)?.value ?? 1;

    return ((lastValue - firstValue) / firstValue) * 100;
  }, [points]);

  const maxValue = useMemo(() => {
    const value = Math.max(...points.map((item) => item.value));
    const index = points.findIndex((item) => item.value === value);

    return {
      value,
      index,
    };
  }, [points]);

  const minValue = useMemo(() => {
    const value = Math.min(...points.map((item) => item.value));
    const index = points.findIndex((item) => item.value === value);

    return {
      value,
      index,
    };
  }, [points]);

  const onPointerSelected = (point: GraphPoint) => {
    setCurrencyValue(point.value);
  };

  const onGestureEnd = useCallback(() => {
    setCurrencyValue(crypto.priceUsd);
  }, []);

  const renderGraphButtons = useCallback(() => {
    const buttons = [];
    for (const item of GRAPH_BUTTON_LABEL_MAPPER) {
      const interval = item[0];
      const label = item[1];

      buttons.push(
        <Button
          textColor={theme.colors.white}
          backgroundColor={
            isEqual(interval, selectedInterval) ? "gray" : undefined
          }
          key={interval}
          onPress={() => onClickGraphButton(interval)}
          size={18}
          text={label.toUpperCase()}
        />
      );
    }
    return buttons;
  }, [selectedInterval]);

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
          flex: 1,
        }}
        points={points}
        enablePanGesture={true}
        enableIndicator
        animated={true}
        indicatorPulsating
        color={theme.colors.lightGreen}
      />
    );
  }, [points, maxValue, minValue]);

  function displayGraph() {
    return (
      <>
        {isLoading || isEmpty(history) ? (
          <LoadingContainer>
            <Loading color={theme.colors.lightGreen} isLoading={isLoading} />
          </LoadingContainer>
        ) : (
          <>
            <PriceContainer>
              <Price>{USDollarFormatter.format(currencyValue)}</Price>
              <ChangePercent
                color={
                  changePercent > 0 ? theme.colors.lightGreen : theme.colors.red
                }
              >
                {`${percentFormatter.format(
                  changePercent
                )}% (${selectedInterval})`}
              </ChangePercent>
            </PriceContainer>
            {renderGraph()}
          </>
        )}
        <GraphButtonsContainer>{renderGraphButtons()}</GraphButtonsContainer>
      </>
    );
  }

  return {
    selectedInterval,
    displayGraph,
  };
};
