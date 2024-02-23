"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { removeAccessTokenFromRedux } from "@/redux/slices/accessTokenSlice";
import { userLogout } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/hooks/redux";
import { deleteDataFromLocalStorage } from "@/utils/storageUtils";

export default function Signout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const logout = async () => {
      // Remove local storage
      await deleteDataFromLocalStorage("access_token");
      await deleteDataFromLocalStorage("user");
      await deleteDataFromLocalStorage("cart");
      await deleteDataFromLocalStorage("userCart");
      await deleteDataFromLocalStorage("userBookmarks");

      // Remove redux
      dispatch(removeAccessTokenFromRedux());
      dispatch(userLogout());

      return router.push("/");
    };

    logout();
  }, []);

  return null;
}
