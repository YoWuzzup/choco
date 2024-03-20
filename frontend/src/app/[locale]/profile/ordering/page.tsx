"use client";
import { useEffect, useState } from "react";

import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { useAppSelector } from "@/hooks/redux";

import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { Tooltip } from "@/components";
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
  const [loading, setLoading] = useState<boolean>(true);
  const selectedCurrency = currentCurency(locale) || "zł";

  useEffect(() => {
    if (!orderRedux) router.push("/profile/cart");
  }, []);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-center pt-[4rem]">
      <div className="w-full sm:w-9/12 px-2 py-6 sm:px-6 mt-24 sm:mt-0 flex flex-col gap-6 shadow-xl rounded-md">
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
      </div>
    </div>
  );
}
