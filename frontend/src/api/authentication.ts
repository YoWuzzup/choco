import axios from "axios";
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
    return error;
  }
};

export const POSTRegister = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    return axios.post(`${url}auth/register`, data, { withCredentials: true });
  } catch (error) {
    console.log("error:", error);

    return error;
  }
};
