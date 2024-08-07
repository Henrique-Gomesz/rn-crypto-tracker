import { fetchCrypto } from "src/api/get-crypto-by-id";
import { updateCrypto, updateUserCrypto } from "src/store/app/app-store";
import { AppDispatch } from "src/store/store";

export const updateCryptoById =
  (id: string) => async (dispatch: AppDispatch) => {
    const crypto = await fetchCrypto(id);
    dispatch(updateCrypto(crypto));
    dispatch(updateUserCrypto());
  };
