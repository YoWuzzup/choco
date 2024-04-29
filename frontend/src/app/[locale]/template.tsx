"use client";
import { GETUpdateTokens } from "@/api/authentication";
import { GETUserAvatar } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import { userLogin } from "@/redux/slices/userSlice";
import { deleteDataFromLocalStorage } from "@/utils/storageUtils";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [dark, setdark] = useState(false);

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

  const dispatch = useAppDispatch();
  // access token
  const [accessToken, saveAccessToken] = useLocalStorage("access_token", "");
  const accessTokenRedux = useAppSelector((st) => st.access_token);
  // user avatar
  const [userAvatarLocal, saveUserAvatarLocal] = useLocalStorage(
    "userAvatar",
    null
  );
  // user
  const [user, saveUser] = useLocalStorage("user", null);

  // checking if user data exists in local storage and save it to redux
  useEffect(() => {
    // If access token is present in local storage
    if (accessToken && !accessTokenRedux) {
      const fetchUserData = async () => {
        try {
          const res = await GETUpdateTokens();
          const { access_token, userData } = res;

          const avatarRes = await GETUserAvatar(userData._id, access_token);

          // Save to local storage
          saveAccessToken(access_token);
          saveUser(userData);
          saveUserAvatarLocal(avatarRes);

          // Save to Redux
          dispatch(saveAccessTokenToRedux(access_token));
          dispatch(userLogin({ ...userData, avatar: avatarRes }));
        } catch (error) {
          // token in storage is expired remove it
          deleteDataFromLocalStorage("access_token");
        }
      };

      fetchUserData();
    }
  }, [accessToken]);

  return <>{children}</>;
}
