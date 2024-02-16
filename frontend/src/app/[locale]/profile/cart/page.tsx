"use client";
import Link from "next/link";

import { Button, ProfileMenu, Spinner } from "@/components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { POSTUpdateUser } from "@/api/user";
import { userUpdate } from "@/redux/slices/userSlice";
import { GETProducts } from "@/api/products";
import { addUserCart } from "@/redux/slices/userCartSlice";

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
    const filteredCart = user.cart.filter((c: any) => c._id !== cartId);

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
    if (!user.cart || user.cart.length === 0) return;

    const fetchCart = async () => {
      try {
        const arrayOfIds: string[] = user.cart.map((c: string, i: number) => {
          const [idPart, restPart] = c.split("?");

          return idPart;
        });

        let res = await GETProducts({ _id: arrayOfIds });
        console.log(arrayOfIds);
        console.log(res);

        saveUserCartToReduxAndLocalStorage(res, addUserCart);
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
        ) : !storedUserCart || storedUserCart.length === 0 ? (
          <div>There's no items in your cart yet.</div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {storedUserCart?.map((l: any, i: number) => {
              return (
                <Link
                  href={`/shop/${l._id}`}
                  key={`${l.name}_${i}`}
                  className="w-full px-7 py-14 mb-8 flex flex-row flex-nowrap gap-8 items-center justify-start
                    shadow-lg rounded-md hover:-translate-y-2 duration-200 group"
                >
                  <>
                    {/* TODO:add correct image */}
                    <img
                      src={``}
                      alt={`like picture ${i}`}
                      className=""
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex flex-col grow">
                      <div className="text-lg capitalize text-primary group-hover:text-colorful">
                        {l.name}
                      </div>
                      <div className="text-paraPrimary">{l.description}</div>
                    </div>
                    <Button
                      type={"button"}
                      buttonClasses={`group/button p-2 border border-red bg-primary rounded-full duration-300 
                        hover:bg-red`}
                      handleClick={(e) => handleRemoveCart(e, l._id)}
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
