import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTUpdateUser = async (
  id: string,
  data: any,
  access_token: string | null
) => {
  try {
    const res = await axios.post(
      `${url}user/${id}/update`,
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
