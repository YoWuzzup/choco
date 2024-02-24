"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";
import { renewUserOrders } from "@/redux/slices/userOrdersSlice";
import { POSTUpdateUser } from "@/api/user";
import { GETProducts } from "@/api/products";

import { Button, ProfileMenu, Spinner } from "@/components";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Profile() {
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  const [storedUserOrders, saveUserOrdersToReduxAndLocalStorage] =
    useReduxAndLocalStorage<[]>("userOrders");
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [loading, setLoading] = useState<boolean>(true);

  const handleRemoveOrder = async (
    e: React.MouseEvent<HTMLButtonElement>,
    orderId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!orderId || !userRedux) return;
    setLoading(true);
    const filteredOrders = userRedux.cart.filter((c: string) => c !== orderId);

    const data = await POSTUpdateUser(
      userRedux._id,
      {
        orders: filteredOrders,
      },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    dispatch(userUpdate(data));
    setLoading(false);
  };

  useEffect(() => {
    if (!userRedux?.orders || userRedux?.orders.length === 0)
      return setLoading(false);

    const fetchOrders = async () => {
      try {
        const ids = userRedux.orders.reduce((acc: any, item: any) => {
          const id = item.split("?");

          return [...acc, id[0]];
        }, []);

        const res = await GETProducts({ _id: ids });

        saveUserOrdersToReduxAndLocalStorage(res, renewUserOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

    setLoading(false);
  }, []);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />
      <div className="w-9/12 px-3">
        {loading ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : !userRedux?.orders || userRedux?.orders.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            There's no items in your cart yet.
          </div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {userRedux?.orders?.map((l: string, i: number) => {
              let obj: any = storedUserOrders?.find((item: any) => {
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
                      handleClick={(e) => handleRemoveOrder(e, l)}
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
