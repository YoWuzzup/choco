import { useAppDispatch } from "./redux";
import useLocalStorage from "./useLocalStorage";

export const useReduxAndLocalStorage = <T>(key: string) => {
  const dispatch = useAppDispatch();

  // check if there's anything in local storage if nothing we get null
  const [storedValue, setDataToLocalStorage] = useLocalStorage<T | null>(
    key,
    null
  );

  const saveData = (data: any, action: any) => {
    try {
      // save to redux
      dispatch(action(data));

      // save to local storage
      setDataToLocalStorage(data);
    } catch (error) {
      console.error("Error saving to Redux and/or local storage:", error);
    }
  };

  return [storedValue, saveData];
};
