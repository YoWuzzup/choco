"use client";
import { useEffect, useState } from "react";

import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { useAppSelector } from "@/hooks/redux";

export default function Ordering() {
  const userRedux = useAppSelector((st) => st.user);
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [storedUserCart, saveUserCartToReduxAndLocalStorage] =
    useReduxAndLocalStorage<[]>("userCart");
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="h-screen relative flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      asd
    </div>
  );
}
