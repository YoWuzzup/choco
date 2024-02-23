"use client";
import Link from "next/link";

import { Button, ProfileMenu, Spinner } from "@/components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { POSTUpdateUser } from "@/api/user";
import { userUpdate } from "@/redux/slices/userSlice";
import { GETProducts } from "@/api/products";
import { renewUserCart } from "@/redux/slices/userCartSlice";

export default function Cart() {
  const [user, saveUser] = useReduxAndLocalStorage<any>("user");
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

    if (!cartId || !user) return;
    setLoading(true);
    const filteredCart = user.cart.filter((c: string) => c !== cartId);

    const data = await POSTUpdateUser(
      user._id,
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
    if (!user.cart || user.cart.length === 0) return setLoading(false);

    const fetchCart = async () => {
      try {
        const ids = user.cart.reduce((acc: any, item: any) => {
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
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-full sm:w-9/12 px-3 mt-24 sm:mt-0">
        {loading ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : !user.cart || user.cart.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            There's no items in your cart yet.
          </div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {user?.cart?.map((l: string, i: number) => {
              let obj: any = storedUserCart?.find((item: any) => {
                return l.includes(`${item._id}`) ? item : null;
              });

              return (
                <Link
                  href={`/shop/${l}`}
                  key={`${obj?.name}_${i}`}
                  className="w-full px-7 py-14 mb-8 flex flex-row flex-nowrap gap-8 items-center justify-start
                    shadow-lg rounded-md hover:-translate-y-2 duration-200 group"
                >
                  <>
                    {/* TODO:add correct image */}
                    <img
                      src={`${obj?.image || ""}`}
                      alt={`like picture ${i}`}
                      className=""
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex flex-col grow">
                      <div className="text-lg capitalize text-primary group-hover:text-colorful">
                        {obj?.name}
                      </div>
                      <div className="text-paraPrimary">{obj?.description}</div>
                    </div>
                    <Button
                      type={"button"}
                      buttonClasses={`group/button p-2 border border-red bg-primary rounded-full duration-300 
                        hover:bg-red`}
                      handleClick={(e) => handleRemoveCart(e, l)}
                    >
                      <DeleteIcon className="text-red group-hover/button:text-secondary" />
                    </Button>
                  </>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
