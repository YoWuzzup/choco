"use client";
import Link from "next/link";

import { Button, ProfileMenu, Skeleton, Spinner } from "@/components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { POSTUpdateUser } from "@/api/user";
import { userUpdate } from "@/redux/slices/userSlice";
import { GETProducts } from "@/api/products";
import { renewUserCart } from "@/redux/slices/userCartSlice";
import { useAppSelector } from "@/hooks/redux";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Ordering() {
  const locale = useLocale();
  const router = useRouter();
  const [user, saveUser] = useReduxAndLocalStorage<any>("user");
  const userRedux = useAppSelector((st) => st.user);
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [storedUserCart, saveUserCartToReduxAndLocalStorage] =
    useReduxAndLocalStorage<[]>("userCart");
  const [loading, setLoading] = useState<boolean>(true);

  const handleRemoveCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    cartId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartId || !userRedux) return;
    setLoading(true);
    const filteredCart = userRedux.cart.filter((c: string) => c !== cartId);

    const data = await POSTUpdateUser(
      userRedux._id,
      {
        cart: filteredCart,
      },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    saveUser(data, userUpdate);
    setLoading(false);
  };

  useEffect(() => {
    if (!userRedux || !userRedux.cart || userRedux.cart.length === 0)
      return setLoading(false);

    const fetchCart = async () => {
      try {
        const ids = userRedux.cart.reduce((acc: any, item: any) => {
          const id = item.split("?");

          return [...acc, id[0]];
        }, []);

        const res = await GETProducts({ _id: ids });

        saveUserCartToReduxAndLocalStorage(res, renewUserCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();

    setLoading(false);
  }, []);

  return (
    <div className="h-screen relative flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      asd
    </div>
  );
}
