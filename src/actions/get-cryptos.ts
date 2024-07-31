import { fetchCryptos } from "src/api/get-cryptos";
import { setCryptos, setIsLoading } from "src/store/app/app-store";
import { AppDispatch } from "src/store/store";

export const getCryptos = () => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));
  const cryptos = await fetchCryptos();
  dispatch(setCryptos(cryptos));
  dispatch(setIsLoading(false));
};
