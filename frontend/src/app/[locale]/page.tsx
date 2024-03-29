"use client";
import { useEffect } from "react";
import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import { userLogin } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/hooks/redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GETUpdateTokens } from "@/api/authentication";
import { deleteDataFromLocalStorage } from "@/utils/storageUtils";

import {
  AboutUsSection,
  BannerSection,
  BestSellerSection,
  Footer,
  SliderSection,
  SubscribeSection,
} from "@/components";

export default function Home() {
  const dispatch = useAppDispatch();
  // access token
  const [accessToken, saveAccessToken] = useLocalStorage("access_token", "");
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
    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const res = await GETUpdateTokens();
          const { access_token, userData } = res;

          // Save to local storage
          saveAccessToken(access_token);
          saveUser(userData);
          saveUserAvatarLocal(userData.avatar);

          // Save to Redux
          dispatch(saveAccessTokenToRedux(access_token));
          dispatch(userLogin(userData));
        } catch (error) {
          // token in storage is expired remove it
          deleteDataFromLocalStorage("access_token");
        }
      };

      fetchUserData();
    }
  }, [accessToken]);

  return (
    <main className="flex flex-col items-center justify-between">
      <SliderSection />
      <AboutUsSection />
      <BestSellerSection />
      <BannerSection />
      <SubscribeSection />
      <Footer />
    </main>
  );
}
