"use client";
import Link from "next/link";
import { AuthOverlay, Button } from "@/components";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { POSTUpdateUser } from "@/api/user";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";

type TPropduct = {
  images: string[];
  name: string;
  price: string | number;
  _id: string;
  categories: string[];
  sizes: string[];
  tastes: string[];
  reviews: {}[];
  cart: string[];
  likes: string[];
};

export const Product: React.FC<{ product: TPropduct }> = ({ product }) => {
  const userRedux = useAppSelector((st) => st.user);
  const [user, saveUserToReduxAndLocalStorage] =
    useReduxAndLocalStorage<any>("user");
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);
  const currency = "zl";

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userRedux) return setShowAuthOverlay(true);

    if (product?._id) {
      const currentCart = userRedux.cart || [];
      const hasInCart = currentCart.includes(product?._id);

      let updatedCart;
      if (hasInCart) {
        updatedCart = currentCart.filter((id: string) => id !== product?._id);
      } else {
        updatedCart = [...currentCart, product?._id];
      }

      const data = await POSTUpdateUser(
        userRedux._id,
        { cart: updatedCart },
        storedAccessToken as string,
        saveAccessTokenToReduxAndLocalStorage
      );

      saveUserToReduxAndLocalStorage(data, userUpdate);
    }
  };

  const handleLikeProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userRedux) return setShowAuthOverlay(true);

    if (product?._id) {
      const currentLikes = userRedux.likes || [];
      const hasLike = currentLikes.includes(product?._id);

      let updatedLikes;

      if (hasLike) {
        updatedLikes = currentLikes.filter((id: string) => id !== product?._id);
      } else {
        updatedLikes = [...currentLikes, product?._id];
      }

      const data = await POSTUpdateUser(
        userRedux._id,
        {
          likes: updatedLikes,
        },
        storedAccessToken as string,
        saveAccessTokenToReduxAndLocalStorage
      );

      saveUserToReduxAndLocalStorage(data, userUpdate);
    }
  };

  return (
    <>
      <div
        className={`sm:basis-10/12 md:basis-5/12 lg:basis-3/12 relative 
                overflow-hidden flex flex-col justify-center items-start 
                p-6 mb-4 shadow-lg duration-200 hover:-translate-y-2
                group/product`}
      >
        <Link
          href={`shop/${product?._id || ""}`}
          className="w-[250px] h-[250px] flex justify-center self-center"
        >
          {product?.images ? (
            <div className="mb-5">
              <img
                className="object-cover w-full h-full rounded-md"
                src={product?.images[0]}
                alt={product?.name}
              />
            </div>
          ) : (
            <div
              className={`animate-pulse flex items-center justify-center w-full h-60 
                bg-gray-300 rounded`}
            >
              <svg
                className="w-full h-full text-gray"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-start items-start text-primary">
          <div className="font-bold capitalize cursor-pointer hover:text-colorful">
            <Link href={`shop/${product?._id}`}>{product?.name}</Link>
          </div>
          <div className="text-colorful">
            {currency} {product?.price}
          </div>
        </div>

        <div
          className={`absolute w-16 top-10 right-0 invisible opacity-0 
            transition-all translate-x-full duration-300 flex flex-col gap-2
            group-hover/product:visible 
            group-hover/product:translate-x-0 group-hover/product:opacity-100`}
        >
          <Button
            type={"button"}
            buttonClasses={""}
            handleClick={handleLikeProduct}
          >
            <FavoriteBorderOutlinedIcon
              className={`w-11 h-11 p-2 rounded-full shadow-md
                    transition-all duration-300 ${
                      userRedux?.likes.includes(product?._id)
                        ? "text-secondary bg-[#bc8157]"
                        : "text-primary bg-primary "
                    } hover:text-secondary hover:bg-[#bc8157]`}
            />
          </Button>

          <Button
            type={"button"}
            buttonClasses={""}
            handleClick={handleAddToCart}
          >
            <ShoppingBagOutlinedIcon
              className={`w-11 h-11 p-2 transition-all duration-300 rounded-full shadow-md
                    ${
                      userRedux?.cart.includes(product?._id)
                        ? "text-secondary bg-[#bc8157]"
                        : "text-primary bg-primary "
                    } hover:text-secondary hover:bg-[#bc8157]`}
            />
          </Button>
        </div>
      </div>

      {showAuthOverlay && (
        <AuthOverlay setShowAuthOverlay={setShowAuthOverlay} />
      )}
    </>
  );
};
