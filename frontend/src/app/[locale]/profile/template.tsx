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
  const [user, saveUser] = useLocalStorage<any>("user", null);
  const [userAvatarLocal, saveUserAvatarLocal] = useLocalStorage(
    "userAvatar",
    null
  );

  // checking if user logged in
  useEffect(() => {
    // user is not logged in:
    if (!user || !accessToken) return router.push("/");

    //resave the state to redux:
    if (!userRedux || !accessTokenRedux) {
      dispatch(userLogin({ ...user, avatar: userAvatarLocal }));
      dispatch(saveAccessTokenToRedux(accessToken));
    }
  }, []);

  return <>{children}</>;
}
