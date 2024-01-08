import { useAppDispatch } from "./redux";
import useLocalStorage from "./useLocalStorage";

export const useReduxAndLocalStorage = <T>(key: string) => {
  const dispatch = useAppDispatch();

  const [storedValue, setDataToLocalStorage] = useLocalStorage<T | null>(
    key,
    null
  );

  const saveData = (data: T, action: (data: any) => any) => {
    try {
      // Save data to local storage
      setDataToLocalStorage(data);

      // save to redux
      dispatch(action(data));
    } catch (error) {
      console.error("Error saving to Redux and/or local storage:", error);
    }
  };

  return [storedValue, saveData] as const;
};
