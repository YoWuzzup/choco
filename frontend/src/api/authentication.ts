import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userLogin, userRegister } from "@/redux/slices/userSlice";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTLoginData = async (data: {
  email: string;
  password: string;
}) => {
  try {
    userLogin(data);
    return axios.post(`${url}auth/login`, data, { withCredentials: true });
  } catch (error) {
    throw error;
  }
};

export const POSTRegister = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ userData: any; access_token: string }> => {
  try {
    const res = await axios.post(`${url}auth/register`, data, {
      withCredentials: true,
    });
    const { access_token } = res?.data;
    const decodedJwt = jwtDecode(access_token) || {};

    return { userData: decodedJwt, access_token };
  } catch (error) {
    throw error;
  }
};
