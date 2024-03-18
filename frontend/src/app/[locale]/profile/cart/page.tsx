"use client";
import Link from "next/link";

import {
  Button,
  ScrollToTop,
  ProfileMenu,
  Skeleton,
  Spinner,
  Input,
} from "@/components";
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
import { currentCurency } from "@/utils/common";

export default function Cart() {
  const locale = useLocale();
  const router = useRouter();
  const [user, saveUser] = useReduxAndLocalStorage<any>("user");
  const userRedux = useAppSelector((st) => st.user);
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [storedUserCart, saveUserCartToReduxAndLocalStorage] =
    useReduxAndLocalStorage<[]>("userCart");
  const [loading, setLoading] = useState<boolean>(true);
  const selectedCurrency = currentCurency(locale) || "zł";

  const handleIncrementAmount = async (item: string) => {
    const [productId, query] = item.split("?");
    const urlParams = new URLSearchParams(query);
    const amount = Number(urlParams.get("amount")) || 1;
    const updatedAmount = amount + 1;

    const cartWithoutItem: string[] =
      userRedux?.cart?.filter((c) => c !== item) || [];

    // Update the amount in the URL
    urlParams.set("amount", updatedAmount.toString());

    // Reconstruct the URL
    const updatedId = `${productId}?${urlParams.toString()}`;

    const updatedCart = [...cartWithoutItem, updatedId].sort();

    saveUser({ cart: updatedCart }, userUpdate);
  };

  const handleDecrementAmount = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    const [productId, query] = item.split("?");
    const urlParams = new URLSearchParams(query);
    const amount = Number(urlParams.get("amount")) || 1;
    const updatedAmount = amount - 1;

    if (updatedAmount < 1) return handleRemoveCart(e, item);

    const cartWithoutItem: string[] =
      userRedux?.cart?.filter((c) => c !== item) || [];

    // Update the amount in the URL
    urlParams.set("amount", updatedAmount.toString());

    // Reconstruct the URL
    const updatedId = `${productId}?${urlParams.toString()}`;

    const updatedCart = [...cartWithoutItem, updatedId].sort();

    saveUser({ cart: updatedCart }, userUpdate);
  };

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

  const handleInfoChange = async () => {};

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
      <ProfileMenu />

      {/* main information */}
      <div className="w-full sm:w-9/12 px-6 mt-24 sm:mt-0 flex flex-col gap-6">
        {loading ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : !userRedux?.cart || userRedux?.cart?.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            There's no items in your cart yet.
          </div>
        ) : (
          <table className="w-full mt-10 border border-[#dee2e6]">
            <thead>
              <tr className="border-2 border-[#dee2e6]">
                <th className="text-xs font-bold py-2 capitalize">
                  product name
                </th>
                <th className="text-xs font-bold py-2 capitalize">price</th>
                <th className="text-xs font-bold py-2 capitalize">quantity</th>
                <th className="text-xs font-bold py-2 capitalize">total</th>
                <th className="text-xs font-bold py-2 capitalize">remove</th>
              </tr>
            </thead>
            <tbody>
              {userRedux?.cart?.map((c, i) => {
                const [productId, query] = c.split("?");
                const urlParams = new URLSearchParams(query);
                const amount = urlParams.get("amount") || 1;
                const taste = urlParams.get("taste") || "";
                const size = urlParams.get("size") || "";

                let obj: any = storedUserCart?.find((item: any) => {
                  return c.includes(`${item._id}`) ? item : null;
                });

                return (
                  <tr
                    key={`${productId}_${i}`}
                    className="border border-dashed border-b-[#dee2e6]"
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-7">
                        <Link href={`/shop/${c}`}>
                          <img
                            src={obj?.images[0] || ""}
                            alt={`product ${i}`}
                            className="w-20 h-20 flex-none object-cover"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <div className="text-md capitalize text-primary duration-300 hover:text-colorful cursor-pointer">
                            <Link href={`/shop/${c}`}>{obj?.name}</Link>
                          </div>
                          <div className="text-[13px] text-paraPrimary capitalize">
                            {size} {taste && ` / ${taste}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center items-center">
                        {/* TODO: rework price */}
                        {selectedCurrency}{" "}
                        {obj?.price || <Skeleton width="16" />}
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 grid-rows-2 w-20 border-solid border-black border-2 font-bold">
                          <div className="flex justify-center items-center border-r col-span-1 row-span-2">
                            {amount}
                          </div>
                          <Button
                            buttonClasses="flex justify-center items-center border-b col-start-2 col-span-1 row-start-1"
                            type="button"
                            handleClick={() => handleIncrementAmount(c)}
                            value={Number(amount) + 1}
                          >
                            +
                          </Button>
                          <Button
                            buttonClasses="flex justify-center items-center col-start-2 col-span-1 row-start-2"
                            type="button"
                            handleClick={(e) => handleDecrementAmount(e, c)}
                            value={Number(amount) > 1 ? Number(amount) - 1 : 1}
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    </td>

                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        {selectedCurrency} {Number(amount) * obj?.price}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center justify-center">
                        <Button
                          type={"button"}
                          buttonClasses={`group/button p-2 border border-red bg-primary rounded-full duration-300
                            hover:bg-red`}
                          handleClick={(e) => handleRemoveCart(e, c)}
                        >
                          <DeleteIcon className="text-red group-hover/button:text-secondary" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* user message */}
        <div className="shadow-lg p-10 rounded-lg">
          <label htmlFor="message to order">Leave us a message:</label>
          <textarea
            id="message to order"
            placeholder="Write some details of your order..."
            rows={6}
            className="w-full resize-none block my-3 p-2.5 text-sm text-primary bg-primary 
              rounded-lg border border-gray focus:ring-blue focus:border-blue"
          ></textarea>
          <div>
            <h4 className="capitalize basis-full">
              Contact and shipping information
            </h4>
            <div className="flex flex-1 flex-row flex-wrap items-start py-5 pl-5 overflow-hidden">
              <ul className="grow">
                <li className="text-xs text-gray-600 uppercase ">Receiver</li>
                <li>{userRedux?.name}</li>
                <li>
                  {userRedux?.contacts?.lineOne} {userRedux?.contacts?.lineTwo}
                </li>
                <li>
                  {userRedux?.contacts?.zip} {userRedux?.contacts?.city}
                </li>
              </ul>

              <ul className="grow">
                <li className="text-xs text-gray-600 uppercase">
                  Phone number
                </li>
                <li>{userRedux?.contacts?.phoneNumber}</li>
              </ul>

              <div className="w-full my-4">
                You can change your delivery address in{" "}
                <Link href={"/profile/settings"} className="text-colorful">
                  the settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* button to buy */}
        <div
          className={`w-full px-7 py-14 my-8 flex flex-row flex-nowrap gap-8 
                  items-center justify-center shadow-lg rounded-md`}
        >
          {loading ? (
            <Spinner
              contanerStyles="h-12 w-full flex justify-center items-center"
              svgStyles="w-10 h-10 animate-spin dark:text-gray-600 fill-blue-600"
            />
          ) : (
            <Button
              type={"button"}
              buttonClasses={`bg-colorful w-16 sm:w-44 h-16 rounded-full text-secondary`}
              handleClick={() => router.push("/profile/ordering")}
            >
              Buy
            </Button>
          )}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
