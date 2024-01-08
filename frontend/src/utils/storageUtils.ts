export const saveDataToLocalStorage = async (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Error saving to local storage:", error);
  }
};

export const deleteDataFromLocalStorage = async (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error saving to local storage:", error);
  }
};
