"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { userLogin } from "@/redux/slices/userSlice";
import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  const accessTokenRedux = useAppSelector((st) => st.access_token);
  const [accessToken, saveAccessToken] = useLocalStorage("access_token", null);
  const [user, saveUser] = useLocalStorage("user", null);

  // checking if user logged in
  useEffect(() => {
    // if there's no local storage the user is not logged in
    if (!user || !accessToken) return router.push("/");

    // if user logged in but no redux resave the state
    if (!userRedux || !accessTokenRedux) {
      dispatch(userLogin(user));
      dispatch(saveAccessTokenToRedux(accessToken));
    }
  }, []);

  return <>{children}</>;
}
