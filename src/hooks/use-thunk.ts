import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface ErrorObject {
  [keys: string]: any;
}

const useThunk = (thunk: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<ErrorObject | null>(null);

  const runThunk = useCallback(
    (arg?: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: ErrorObject) => setLoadingError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return {
    isLoading,
    loadingError,
    runThunk,
  };
};

export default useThunk;
