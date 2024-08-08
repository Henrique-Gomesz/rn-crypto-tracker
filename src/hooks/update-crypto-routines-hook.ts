import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./store-hook";
import { getCryptos } from "src/actions/get-cryptos";
import { updateCryptoById } from "src/actions/update-crypto";
import { ROUTINE_INTERVAL } from "src/utils/constants";

type UseUpdateCryptoRoutines = {
  startGetCryptosRoutine: () => void;
  startUpdateCryptoRoutine: (id: string) => void;
  clearRoutines: () => void;
};

export const useUpdateCryptoRoutines = (): UseUpdateCryptoRoutines => {
  const dispatch = useAppDispatch();
  const [intervals, setIntervals] = useState<NodeJS.Timeout[]>([]);

  const startGetCryptosRoutine = useCallback(() => {
    const interval = setInterval(() => {
      dispatch(getCryptos());
    }, ROUTINE_INTERVAL);

    setIntervals([...intervals, interval]);
  }, []);

  const startUpdateCryptoRoutine = useCallback((id: string) => {
    const interval = setInterval(() => {
      dispatch(updateCryptoById(id));
    }, ROUTINE_INTERVAL);

    setIntervals([...intervals, interval]);
  }, []);

  function clearRoutines() {
    intervals.forEach((interval) => {
      clearInterval(interval);
    });

    setIntervals([]);
  }

  return {
    clearRoutines,
    startGetCryptosRoutine,
    startUpdateCryptoRoutine,
  };
};
