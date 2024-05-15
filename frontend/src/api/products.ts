import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const GETProducts = async (query: unknown) => {
  console.log(url);

  try {
    const res = await axios.get(`${url}products`, {
      params: query,
      withCredentials: true,
    });
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};

export const GETOneProduct = async (id: string | string[]) => {
  try {
    const res = await axios.get(`${url}products/${id}`, {
      withCredentials: true,
    });
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};
