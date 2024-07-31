import { Crypto } from "src/entities/crypto";
import { BASE_URL } from "src/utils/constants";

type GetCryptosResponse = {
  data: Crypto[];
};

export async function fetchCryptos(): Promise<Crypto[]> {
  try {
    const response = await fetch(BASE_URL + "/v2/assets", {
      method: "GET",
    });
    const data = (await response.json()) as GetCryptosResponse;

    return data.data;
  } catch (error) {
    return [];
  }
}
