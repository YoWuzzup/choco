import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

type AxiosConfig = {
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export const POSTUpdateUser = async (
  id: string,
  data: {},
  access_token: string,
  funcToSaveAccessToken: (data: unknown, action: (data: any) => void) => void,
  config: AxiosConfig = {
    withCredentials: true,
  }
): Promise<any> => {
  try {
    const res = await axios.post(
      `${url}user/${id}/update`,
      { ...data, access_token },
      {
        ...config,
      }
    );

    // send a req again if old access token is used and got a new one
    if (res.data.access_token) {
      funcToSaveAccessToken(res.data.access_token, saveAccessTokenToRedux);

      const updatedData = await POSTUpdateUser(
        id,
        { ...data },
        res.data.access_token,
        funcToSaveAccessToken
      );

      return updatedData;
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const POSTUpdateUserAvatar = async (
  id: string,
  formData: FormData,
  access_token: string,
  config: AxiosConfig = {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${access_token}`,
    },
  }
): Promise<any> => {
  try {
    const res = await axios.post(
      `${url}user/${id}/update-user-avatar`,
      formData,
      {
        ...config,
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GETUserAvatar = async (
  id: string,
  access_token: string,
  config: AxiosConfig = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
): Promise<any> => {
  try {
    const res = await axios.get(`${url}user/${id}/get-user-avatar`, {
      ...config,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const POSTSubscribeToNews = async (email: string): Promise<any> => {
  try {
    const res = await axios.post(`${url}email/subscribetonews`, { email });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
