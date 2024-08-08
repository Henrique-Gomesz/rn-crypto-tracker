import { CryptoHistory } from "src/entities/crypto-history";
import { BASE_URL } from "src/utils/constants";

type GetCryptoHistoryResponse = {
  data: CryptoHistory[];
};

export async function fetchCryptoHistory(
  cryptoId: string,
  interval: string = "d1"
): Promise<CryptoHistory[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/v2/assets/${cryptoId}/history?interval=${interval}`,
      {
        method: "GET",
        cache: "force-cache",
      }
    );

    const data = (await response.json()) as GetCryptoHistoryResponse;

    return data.data.map((item) => {
      const cryptoHistory: CryptoHistory = {
        date: new Date(item.date),
        priceUsd: item.priceUsd,
        time: item.time,
      };

      return cryptoHistory;
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}
