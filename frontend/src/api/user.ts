import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTUpdateUser = async (id: string, data: unknown) => {
  try {
    const res = await axios.post(`${url}user/${id}/update`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
