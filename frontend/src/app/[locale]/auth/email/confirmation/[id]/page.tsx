"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { POSTConfirmEmail } from "@/api/authentication";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { userUpdate } from "@/redux/slices/userSlice";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function EmailConfirmation() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  const [user, saveUser] = useLocalStorage("user", null);

  useEffect(() => {
    const confirmEmail = async () => {
      const res = await POSTConfirmEmail(params.id);

      // update local storage
      saveUser({ ...(user || userRedux || {}), ...res });
      // update redux
      dispatch(userUpdate(res));

      router.push("/");
    };

    confirmEmail();
  }, []);

  return null;
}
