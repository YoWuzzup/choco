import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTUpdateUser = async (
  id: string,
  data: {},
  access_token: string,
  funcToSaveAccessToken: (data: unknown, action: (data: any) => void) => void
): Promise<any> => {
  try {
    const res = await axios.post(
      `${url}user/${id}/update`,
      { ...data, access_token },
      {
        withCredentials: true,
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
