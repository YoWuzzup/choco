import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const GETProducts = async (query: unknown) => {
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

export const GETOneProduct = async (id: unknown) => {
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

export const POSTUpdateProductReviews = async (
  id: string,
  data: any,
  access_token: string | null
) => {
  try {
    const res = await axios.post(
      `${url}products/${id}/update/reviews`,
      { ...data, access_token },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
