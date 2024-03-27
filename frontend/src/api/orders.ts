import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTMakeNewOrder = async (
  data: any,
  access_token: string
): Promise<any> => {
  try {
    const res = await axios.post(`${url}orders`, data, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GETOrders = async (query: unknown) => {
  try {
    const res = await axios.get(`${url}orders`, {
      params: query,
      withCredentials: true,
    });
    const { data } = res;

    return data;
  } catch (error) {
    throw error;
  }
};
