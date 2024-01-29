"use client";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks/redux";
import useLocalStorage from "@/hooks/useLocalStorage";

import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import { userLogin } from "@/redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

export default function Template({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [dark, setdark] = useState(false);
  // access token
  const [accessTokenInLocalStorage, setAccessTokenToLocalStorage] =
    useLocalStorage("access_token", null);

  // TODO: change theme button
  const handleChange = () => {
    setdark((p) => !p);

    const a = document.getElementsByTagName("html")[0];
    if (a) {
      // If dark is true, add the 'dark' class; otherwise, remove it
      if (dark) {
        a.classList.add("dark");
      } else {
        a.classList.remove("dark");
      }
    }
  };

  // checking if user data exists in local storage and save it to redux
  useEffect(() => {
    if (!accessTokenInLocalStorage) return;
    const decodedJwt = jwtDecode(accessTokenInLocalStorage) || null;

    dispatch(saveAccessTokenToRedux(accessTokenInLocalStorage));

    dispatch(userLogin(decodedJwt));
    localStorage.setItem("user", JSON.stringify(decodedJwt));
  }, []);

  return <>{children}</>;
}
