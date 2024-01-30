import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const GETProducts = async (query: unknown) => {
  try {
    const res = await axios.get(`${url}products`, { params: query });
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};

export const GETOneProduct = async (id: unknown) => {
  try {
    const res = await axios.get(`${url}products/${id}`);
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};
