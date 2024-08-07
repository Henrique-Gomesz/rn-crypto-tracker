import { Crypto } from "src/entities/crypto";
import { BASE_URL } from "src/utils/constants";

type GetCryptoResponse = {
  data: Crypto;
};

export async function fetchCrypto(id: string): Promise<Crypto> {
  try {
    const response = await fetch(`${BASE_URL}/v2/assets/${id}`, {
      method: "GET",
      cache: "force-cache",
    });
    const data = (await response.json()) as GetCryptoResponse;

    return data.data;
  } catch (error) {
    throw new Error("Failed to fetch crypto");
  }
}
