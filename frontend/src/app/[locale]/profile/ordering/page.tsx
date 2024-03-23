"use client";
import { useEffect, useState } from "react";

import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { useAppSelector } from "@/hooks/redux";

import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { Button, Spinner, Tooltip } from "@/components";
import { useRouter } from "next/navigation";
import { currentCurency } from "@/utils/common";
import { useLocale } from "next-intl";

export default function Ordering() {
  const router = useRouter();
  const userRedux = useAppSelector((st) => st.user);
  const orderRedux = useAppSelector((st) => st.newOrder);
  const locale = useLocale();
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [storedUserCart, saveUserCartToReduxAndLocalStorage] =
    useReduxAndLocalStorage<[]>("userCart");
  const [loading, setLoading] = useState<boolean>(false);
  const selectedCurrency = currentCurency(locale) || "zł";

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("TODO");
  };

  useEffect(() => {
    if (!orderRedux) router.push("/profile/cart");
  }, []);

  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-start pt-[4rem]">
      <div className="w-full sm:w-9/12 px-2 py-6 sm:px-6 mt-5 sm:mt-10 flex flex-col gap-6 shadow-xl rounded-md">
        <h2 className="text-xl text-primary">Confirmation</h2>
        <Tooltip message={"This store can't accept online payments right now."}>
          <div className="w-full min-h-[200px] p-5 bg-[#f5f5f5] flex flex-col items-center justify-center gap-4">
            <MoneyOffIcon className="text-paraPrimary" />
            <span className="text-paraPrimary">
              This store can't accept online payments right now.
            </span>
          </div>
        </Tooltip>

        <div className="w-full p-5">
          Total price: {selectedCurrency}
          {orderRedux?.additionalData?.totalPrice}
        </div>

        <div className="">
          Delivery address:
          {orderRedux?.additionalData?.selfPickup ? (
            // TODO: write correct address
            <div className="mt-4">Self pickup at </div>
          ) : (
            <div className="mt-4 flex flex-row flex-nowrap items-start">
              <ul className="grow">
                <li className="text-xs text-gray-600 uppercase mb-3">
                  Receiver
                </li>
                <li>{userRedux?.name}</li>
                <li>
                  {userRedux?.contacts?.lineOne} {userRedux?.contacts?.lineTwo}
                </li>
                <li>
                  {userRedux?.contacts?.zip} {userRedux?.contacts?.city}
                </li>
              </ul>

              <ul className="grow">
                <li className="text-xs text-gray-600 uppercase mb-3">
                  Phone number
                </li>
                <li>{userRedux?.contacts?.phoneNumber}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* button to confirm */}
      <div
        className={`w-full sm:w-9/12 px-2 py-6 sm:px-6 flex flex-row flex-nowrap gap-8 
                  items-center justify-center shadow-lg rounded-md`}
      >
        {loading ? (
          <Spinner
            contanerStyles="h-12 w-full flex justify-center items-center"
            svgStyles="w-10 h-10 animate-spin dark:text-gray fill-blue"
          />
        ) : (
          <Button
            type={"button"}
            buttonClasses={`bg-colorful w-44 h-16 rounded-full text-secondary`}
            handleClick={handleSubmit}
          >
            Confirm & Order
          </Button>
        )}
      </div>
    </div>
  );
}
