"use client";
import { useEffect } from "react";

import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { useRouter } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [accessToken, saveAccessToken] =
    useReduxAndLocalStorage("access_token");
  const [user, saveUser] = useReduxAndLocalStorage("user");

  // checking if user logged in
  useEffect(() => {
    if (!user || !accessToken) return router.push("/");
  }, []);

  return <>{children}</>;
}
