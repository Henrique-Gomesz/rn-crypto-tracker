import { fetchCryptos } from "src/api/get-cryptos";
import {
  setCryptos,
  setIsLoading,
  updateUserCrypto,
} from "src/store/app/app-store";
import { AppDispatch } from "src/store/store";

export const getCryptos = () => async (dispatch: AppDispatch) => {
  const cryptos = await fetchCryptos();
  dispatch(setCryptos(cryptos));
  dispatch(updateUserCrypto());
};
