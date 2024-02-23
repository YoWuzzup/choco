import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const POSTLogout = async (): Promise<any> => {
  try {
    const res = await axios.post(`${url}auth/logout`, {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const GETUpdateTokens = async (): Promise<{
  userData: any;
  access_token: string;
}> => {
  try {
    const res = await axios.get(`${url}auth/refresh`, {
      withCredentials: true,
    });
    const { access_token } = res?.data;

    const decodedJwt = jwtDecode(access_token) || null;

    return { userData: decodedJwt, access_token };
  } catch (error) {
    throw error;
  }
};

export const POSTLoginData = async (data: {
  email: string;
  password: string;
}): Promise<{ userData: any; access_token: string }> => {
  try {
    const res = await axios.post(`${url}auth/login`, data, {
      withCredentials: true,
    });

    const { access_token } = res?.data;
    const decodedJwt = jwtDecode(access_token) || null;

    return { userData: decodedJwt, access_token };
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
    const decodedJwt = jwtDecode(access_token) || null;

    return { userData: decodedJwt, access_token };
  } catch (error) {
    throw error;
  }
};
