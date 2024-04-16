"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { Button, Spinner, Tooltip } from "@/components";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { currentCurency } from "@/utils/common";
import { POSTMakeNewOrder } from "@/api/orders";
import { userUpdate } from "@/redux/slices/userSlice";
import { clearUserCart } from "@/redux/slices/userCartSlice";

export default function Ordering() {
  const t = useTranslations("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  const orderRedux = useAppSelector((st) => st.newOrder);
  const accessTokenRedux = useAppSelector((st) => st.access_token);
  const locale = useLocale();
  const [storedUser, saveUserToReduxAndLocalStorage] =
    useReduxAndLocalStorage("user");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<null | boolean>(null);
  const [error, setError] = useState<null | Error>(null);
  const selectedCurrency = currentCurency(locale) || "zł";

  const getOrderDay = () => {
    const startDateStr =
      orderRedux?.additionalData?.dateToMakeOrder?.startDate ||
      Date.now() + 2 * 24 * 60 * 60 * 1000;
    const startDate = new Date(startDateStr);

    // Get year, month, and day
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");

    // Create the formatted date string
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    if (success) return setLoading(false);

    await POSTMakeNewOrder(orderRedux, accessTokenRedux as string)
      .then((res) => {
        saveUserToReduxAndLocalStorage(
          {
            orders: [...(userRedux?.orders || []), res._id],
          },
          userUpdate
        );

        setSuccess(true);
        saveUserToReduxAndLocalStorage({ cart: [] }, userUpdate);
        dispatch(clearUserCart());
      })
      .catch((e) => {
        setError(e);
        setSuccess(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!orderRedux) router.push("/profile/cart");
  }, []);

  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-start pt-[4rem]">
      <div className="w-full sm:w-9/12 px-2 py-6 sm:px-6 mt-5 sm:mt-10 flex flex-col gap-6 shadow-xl rounded-md">
        <h2 className="text-xl text-primary capitalize">
          {t("pages.profile.ordering.confirmation")}
        </h2>
        <Tooltip message={t("pages.profile.ordering.cant accept")}>
          <div className="w-full min-h-[200px] p-5 bg-[#f5f5f5] flex flex-col items-center justify-center gap-4">
            <MoneyOffIcon className="text-paraPrimary" />
            <span className="text-paraPrimary">
              {t("pages.profile.ordering.cant accept")}
            </span>
          </div>
        </Tooltip>

        <div className="w-full p-5">
          {t("pages.profile.ordering.total price")}: {selectedCurrency}
          {orderRedux?.additionalData?.totalPrice}
        </div>

        <div className="">
          {t("pages.profile.ordering.delivery address")}:
          {orderRedux?.additionalData?.selfPickup ? (
            <div className="mt-4">
              {t("pages.profile.self pick up")}{" "}
              {`${process.env.NEXT_PUBLIC_ADDRESS}`}
            </div>
          ) : (
            <div className="mt-4 flex flex-row flex-nowrap items-start">
              <ul className="grow">
                <li className="text-xs text-gray-600 uppercase mb-3">
                  {t("pages.profile.receiver")}
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
                  {t("pages.profile.phone number")}
                </li>
                <li>{userRedux?.contacts?.phoneNumber}</li>
              </ul>
            </div>
          )}
          <div className="basis-full my-4">
            {t("pages.profile.date to deliver")}: {`${getOrderDay()}`}
          </div>
          <div className="basis-full my-4">
            {t("pages.profile.change address")}{" "}
            <Link href={"/profile/settings"} className="text-colorful">
              {t("pages.profile.the settings")}
            </Link>
          </div>
        </div>
      </div>

      {/* res status */}
      {(error || success) && (
        <div
          className={`w-full sm:w-9/12 p-4 flex flex-row flex-wrap gap-8 
                  items-center justify-center shadow-lg rounded-md transition-all duration-300
                  ${error || success ? "h-[250px]" : "h-0 invisible"}`}
        >
          {success ? (
            <>
              {t("pages.profile.success")}
              <DoneIcon className="text-success" />
            </>
          ) : (
            <>
              {t("pages.profile.error")}
              <CloseIcon className="text-error" />
            </>
          )}

          <Link href={"/"} className="text-colorful">
            {t("pages.profile.link to go home")}
          </Link>
        </div>
      )}

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
            buttonClasses={`bg-colorful w-44 h-16 rounded-full text-secondary capitalize`}
            handleClick={handleSubmit}
          >
            {t("pages.profile.ordering.confirm & order")}
          </Button>
        )}
      </div>
    </div>
  );
}
