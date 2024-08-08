import { useCallback, useState } from "react";
import { Crypto } from "src/entities/crypto";
import { CryptoHistory } from "src/entities/crypto-history";
import { useAppSelector } from "src/hooks/store-hook";
import { fetchCryptoHistory as fetchCryptoHistoryApi } from "src/api/get-cryptos-history";
import { DEFAULT_CRYPTO } from "src/utils/constants";
type Props = {
  cryptoId: string;
};

type UseCryptoHistory = {
  history: CryptoHistory[];
  isLoading: boolean;
  fetchCryptoHistory: (interval?: string) => void;
};

export const useCryptoHistory = ({ cryptoId }: Props): UseCryptoHistory => {
  const [cryptoHistoryData, setCryptoHistoryData] = useState<CryptoHistory[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const crypto =
    useAppSelector((state) =>
      state.app.cryptos.find((crypto) => crypto.id === cryptoId)
    ) ?? DEFAULT_CRYPTO;

  function handleLoading() {
    setIsLoading((prev) => !prev);
  }

  const fetchCryptoHistory = useCallback((interval?: string): void => {
    handleLoading();
    fetchCryptoHistoryApi(cryptoId, interval)
      .then((data) => {
        setCryptoHistoryData(data);
      })
      .catch(() => {
        setCryptoHistoryData([]);
      })
      .finally(() => {
        handleLoading();
      });
  }, []);

  return {
    history: cryptoHistoryData,
    isLoading,
    fetchCryptoHistory,
  };
};
