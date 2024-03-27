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
import { GETOrders } from "@/api/orders";

export default function Profile() {
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  const ordersRedux = useAppSelector((st) => st.userOrders);
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
        const res = await GETOrders({ _id: userRedux?.orders });

        saveUserOrdersToReduxAndLocalStorage(res, renewUserOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

    setLoading(false);
  }, []);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-center sm:justify-end pt-[4rem]">
      <ProfileMenu />
      <div className="w-full sm:w-9/12 px-3">
        <h3 className="flex justify-center items-center mt-10">
          History of purchasing
        </h3>
        {loading ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : !userRedux?.orders || userRedux?.orders.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            You don't have any order yet!
          </div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {ordersRedux?.map((o: any, i: number) =>
              o.items && o.items.length > 0 ? (
                <div
                  key={`${o?.date}_${i}`}
                  className="w-full px-7 py-14 mb-8 flex flex-row flex-wrap gap-8 
                      items-center justify-center sm:justify-start shadow-lg rounded-md"
                >
                  <h4 className="basis-full">
                    {`Date of order: ${new Date(o.date).toLocaleDateString(
                      "en-GB"
                    )}`}
                  </h4>
                  {o.items?.map((item: any, itemIndex: number) => (
                    <div key={`${item.name}_${itemIndex}`}>
                      <img
                        src={`${item.images[0] || ""}`}
                        alt={`picture ${i}`}
                        className="w-[100px] h-[100px]"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="flex flex-col grow">
                        <div className="text-sm capitalize text-primary my-3">
                          {item?.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
