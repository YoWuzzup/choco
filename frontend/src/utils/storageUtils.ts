export const saveDataToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Error saving to local storage:", error);
  }
};
