"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addSingleProduct } from "@/redux/slices/productsSlice";
import {
  AuthOverlay,
  Breadcrumb,
  Button,
  Rating,
  Skeleton,
  Slider,
  Tooltip,
} from "@/components";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { GETOneProduct } from "@/api/products";
import { POSTUpdateUser } from "@/api/user";
import { userUpdate } from "@/redux/slices/userSlice";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { currentCurency, getColorsByTaste } from "@/utils/common";
import { GETReviews } from "@/api/reviews";
import { addReviews } from "@/redux/slices/reviewsSlice";
import { useDarkMode } from "usehooks-ts";

const BreadcrumbAndNextPrevBtns: React.FC = () => {
  const t = useTranslations("");
  const router = useRouter();
  const product = useAppSelector((st) => st.products.singleProduct);
  const productsArray = useAppSelector((st) => st.products.listOfProducts);

  const handleNextProd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentProdIndex =
      productsArray?.findIndex((i) => i?._id === product?._id) ?? -1;
    let nextProd;

    if (currentProdIndex !== -1) {
      nextProd = productsArray?.[currentProdIndex + 1];
    }

    if (nextProd) {
      router.push(`/shop/${nextProd._id}`);
    }
  };

  const handlePrevProd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentProdIndex =
      productsArray?.findIndex((i) => i?._id === product?._id) ?? -1;
    let prevProd;

    if (currentProdIndex !== -1) {
      prevProd = productsArray?.[currentProdIndex - 1];
    }

    if (prevProd) {
      router.push(`/shop/${prevProd._id}`);
    }
  };

  return (
    <div className="w-full mb-8 flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center">
      <Breadcrumb
        crumbs={[
          { name: t("links.home"), href: "/" },
          { name: t("links.shop"), href: "/shop" },
          { name: product?.name || "", href: "/" },
        ]}
      />

      <div
        className="flex flex-nowrap justify-center items-center basis-full sm:basis-auto
                      mt-4 sm:mt-0"
      >
        <Button
          type={"button"}
          buttonClasses={`uppercase text-[10px] mr-4 flex flex-nowrap justify-center 
              items-center hover:text-colorful transition-all duration-300`}
          handleClick={handlePrevProd}
        >
          <NavigateBeforeIcon />
          {t("buttons.prev")}
        </Button>
        <div className="after:content-[''] after:border-2 after:border-gray" />
        <Button
          type={"button"}
          buttonClasses={`uppercase text-[10px] ml-4 flex flex-nowrap justify-center 
              items-center hover:text-colorful transition-all duration-300`}
          handleClick={handleNextProd}
        >
          {t("buttons.next")}
          <NavigateNextIcon />
        </Button>
      </div>
    </div>
  );
};

const LeftPictureSide: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const product = useAppSelector((st) => st.products.singleProduct);

  return (
    <div className="flex flex-col justify-start items-center mb-5 dm:mb-0">
      {product?.images && product?.images.length !== 0 ? (
        <Slider
          propSettings={{
            dots: true,
            arrows: false,
            // for rewriting default class of dots and then add my dots
            dotsClass: `flex flex-row justify-center w-full static gap-3`,
            appendDots: (dots: any) => (
              <ul>
                {dots.map((d: any, index: number) => {
                  return <li key={index}>{d.props.children}</li>;
                })}
              </ul>
            ),
            customPaging: (i: number) => (
              <img
                className={`w-36 h-16 sm:h-28 md:h-36 object-cover cursor-pointer ${i === currentSlide
                  ? "border-solid border-2 border-colorfulColor"
                  : ""
                  }`}
                src={product?.images[i]}
                alt="first slide"
              />
            ),
            beforeChange: (prev: number, next: number) => {
              setCurrentSlide(next);
            },
          }}
        >
          {product?.images?.map((imageUrl, index) => (
            <div
              className="relative mb-2 h-[400px] overflow-hidden"
              key={index}
            >
              <img
                className="object-cover w-full h-full"
                src={imageUrl}
                alt={`product slide ${index}`}
              />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

const RightInfoSide: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const t = useTranslations("");
  const product = useAppSelector((st) => st.products.singleProduct);
  const reviews = useAppSelector((st) => st.reviews);
  const [user, saveUserToReduxAndLocalStorage] =
    useReduxAndLocalStorage<any>("user");
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const router = useRouter();
  const locale = useLocale();
  const localeKey = product?.description
    ? (locale as keyof typeof product.description)
    : "en";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sizeQueryParam = searchParams.get("size");
  const tasteQueryParam = searchParams.get("taste");
  let amountQueryParam = searchParams.get("amount") || 1;
  const selectedCurrency = currentCurency();
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    return params.toString();
  };

  const handleFilterChange = (e: any) => {
    e.preventDefault();

    const name = e.target.id || e.target.name;
    const value = e.target.value;

    router.replace(`${pathname}?${createQueryString(name, value)}`);

    if (!value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(name);

      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) return setShowAuthOverlay(true);

    if (product?._id) {
      const urlSearchParams = new URLSearchParams(window.location.search);

      // Check if there's a size in urlSearchParams, otherwise add default value
      const sizeQueryParam = urlSearchParams.get("size");
      const defaultSize =
        product?.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
      const newSize = sizeQueryParam || defaultSize;

      // Check if there's a taste in urlSearchParams, otherwise add default value
      const tasteQueryParam = urlSearchParams.get("taste");
      const defaultTaste =
        product?.tastes && product.tastes.length > 0 ? product.tastes[0] : null;
      const newTaste = tasteQueryParam || defaultTaste;

      // Check if there's an amount in urlSearchParams, otherwise add default value
      const amountQueryParam = urlSearchParams.get("amount");
      const defaultAmount = 1;
      const newAmount = amountQueryParam || defaultAmount;

      // Construct new cart item
      const newCartItem = `${product._id}?size=${newSize}&taste=${newTaste}&amount=${newAmount}`;

      const updatedCart = [...user.cart, newCartItem];

      const data = await POSTUpdateUser(
        user._id,
        { cart: updatedCart },
        storedAccessToken as string,
        saveAccessTokenToReduxAndLocalStorage
      );

      saveUserToReduxAndLocalStorage(data, userUpdate);
    }
  };

  const handleLikeProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return setShowAuthOverlay(true);

    if (product?._id) {
      const currentLikes = user.likes || [];
      const hasLike = currentLikes.includes(product?._id);

      let updatedLikes;

      if (hasLike) {
        updatedLikes = currentLikes.filter((id: string) => id !== product?._id);
      } else {
        updatedLikes = [...currentLikes, product?._id];
      }

      const data = await POSTUpdateUser(
        user._id,
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
    <div className="flex flex-col justify-start items-center gap-3 [&>*:basis-full]">
      {/* name and like */}
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="text-2xl font-bold text-primary capitalize flex justify-center items-center">
          {product?.name || <Skeleton />}
        </h3>
        <Button
          type={"button"}
          buttonClasses={""}
          handleClick={handleLikeProduct}
        >
          <FavoriteBorderOutlinedIcon
            className={`w-10 h-10 p-2 transition-all duration-300 rounded-full shadow-md 
                ${isDarkMode ? "shadow-colorfulColor" : ""}
                  ${user?.likes?.includes(product?._id)
                ? "bg-colorful hover:bg-primary text-secondary hover:text-primary"
                : "bg-primary hover:bg-colorful text-primary hover:text-secondary"
              }`}
          />
        </Button>
      </div>

      {/* price and review */}
      <div
        className="flex flex-col justify-start w-full pb-6 mb-5
                  border-b-[1px] border-[#e7e7e7] border-solid"
      >
        <div className="text-xl text-colorful font-bold w-full mb-4 flex flex-row items-center justify-start">
          {selectedCurrency} {product?.price || <Skeleton width="16" />}
        </div>
        <div className="text-xs text-[#999] font-normal flex justify-start items-center gap-5">
          {reviews ? (
            <>
              <Rating data={reviews?.map((r) => r?.rating || 5)} />{" "}
              {reviews.length}{" "}
              {reviews.length === 1
                ? t("pages.shop.review")
                : t("pages.shop.reviews")}
            </>
          ) : (
            <>
              <Rating
                data={[]}
                containerClasses="flex justrify-center items-center mr-4"
              />{" "}
              {t("pages.shop.no reviews")}
            </>
          )}
        </div>
      </div>

      {/*  info para */}
      <div className="flex flex-col justify-center items-start w-full pb-5">
        {product && !product.description ? (
          <></>
        ) : product?.description ? (
          <p className="text-sm text-[#a8a8a8]">
            {product.description[localeKey]}
          </p>
        ) : (
          ["", "", ""].map((_, i) => (
            <Skeleton
              width="full"
              key={`${i}`}
              containerClassName="w-3/4 animate-pulse flex justify-start items-center mb-2"
            />
          ))
        )}
      </div>

      {/* sizes */}
      {product?.sizes && (
        <div className="w-full mb-5 flex flex-row flex-wrap sm:flex-nowrap gap-2">
          <div
            className="text-[11px] w-6 text-primary font-bold uppercase relative mr-5 pb-2 h-fit
              after:bottom-0 after:left-0 after:absolute after:content-[''] 
              after:w-10 after:border-b"
          >
            {t("pages.shop.size")}
          </div>
          {product?.sizes.map((s, i) => (
            <Button
              key={`${s}_${i}`}
              buttonClasses={`py-2 px-4 border-solid border-[1px] border-black cursor-pointer
              transition-all duration-300 hover:bg-secondary hover:text-secondary
              ${sizeQueryParam === s
                  ? "bg-secondary text-secondary"
                  : "bg-primary text-primary"
                }`}
              handleClick={(e) => handleFilterChange(e)}
              value={s}
              id="size"
              type={"button"}
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      {/* tastes */}
      {product?.tastes && (
        <div className="w-full mb-5 flex flex-row flex-wrap sm:flex-nowrap gap-6">
          <div
            className="text-[11px] w-6 text-primary font-bold uppercase relative mr-5 pb-2 h-fit
          after:bottom-0 after:left-0 after:absolute after:content-[''] 
          after:w-10 after:border-b"
          >
            {t("pages.shop.tastes")}
          </div>
          {product?.tastes.map((t, i) => {
            const tasteArray = t.split("-");
            const arrayLength = tasteArray.length;
            const colorsArray = getColorsByTaste(tasteArray);

            const gradientTaste = colorsArray
              .map((col: any, index: number) => {
                const mindegrees = (index / arrayLength) * 360;
                const maxdegrees = (360 / arrayLength) * (index + 1);

                return `${col} ${mindegrees}deg ${maxdegrees}deg`;
              })
              .join(",");

            return (
              <Tooltip message={`${t}`} key={`${t}_${i}`}>
                <Button
                  buttonClasses={`relative rounded-full cursor-pointer transition-all duration-300 w-9 h-9 p-2
                    after:bottom-1/2 after:left-1/2 after:absolute after:content-[''] 
                    after:w-12 after:h-12 after:rounded-full after:border-2 after:-translate-x-1/2 after:translate-y-1/2      
                    ${tasteQueryParam === t
                      ? `after:border-colorfulColor`
                      : "after:border-secondary"
                    }`}
                  style={{
                    background: `conic-gradient(${gradientTaste})`,
                  }}
                  type={"button"}
                  id="taste"
                  value={t}
                  handleClick={(e) => handleFilterChange(e)}
                />
              </Tooltip>
            );
          })}
        </div>
      )}

      {/* amount and order button */}
      <div className="flex flex-row flex-wrap gap-4 self-start">
        <div className="grid grid-cols-2 grid-rows-2 w-20 border-solid border-black border-2 font-bold">
          <div
            className="flex justify-center items-center w-full border-r-[1px]"
            style={{ gridArea: "1 / 1 / 3 / 2" }}
          >
            {amountQueryParam}
          </div>
          <Button
            buttonClasses={`flex justify-center items-center w-full border-b-[1px] border-b-black
                  cursor-pointer text-primary hover:text-colorful duration-300`}
            style={{ gridArea: "1 / 2 / 2 / 3" }}
            type={"button"}
            handleClick={handleFilterChange}
            id="amount"
            value={Number(amountQueryParam) + 1}
          >
            +
          </Button>
          <Button
            buttonClasses="flex justify-center items-center w-full cursor-pointer text-primary hover:text-colorful duration-300"
            style={{ gridArea: "2 / 2 / 3 / 3" }}
            type={"button"}
            handleClick={handleFilterChange}
            id="amount"
            value={
              Number(amountQueryParam) > 1 ? Number(amountQueryParam) - 1 : 1
            }
          >
            -
          </Button>
        </div>

        <Button
          type={"button"}
          buttonClasses={`uppercase text-secondary grow text-sm px-10 bg-colorful hover:bg-secondary duration-300
              h-14`}
          handleClick={handleAddToCart}
        >
          {t("buttons.add to cart")}
        </Button>

        <Button
          type={"button"}
          buttonClasses={`uppercase basis-full text-secondary text-sm px-10 bg-secondary hover:bg-colorful duration-300
              h-14`}
          handleClick={(e) => {
            handleAddToCart(e);

            router.push("/profile/cart");
          }}
        >
          {t("buttons.buy it now")}
        </Button>

        {/* categories */}
        {product?.categories && (
          <div className="text-sm capitalize">
            {t("pages.shop.categories")}:{" "}
            {product.categories.map((c, i) => (
              <span
                key={`${c}_${i}`}
                className="text-[#bfbfbf] hover:text-colorful cursor-pointer"
              >
                {c}
                {i !== product.categories.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>

      {showAuthOverlay && (
        <AuthOverlay setShowAuthOverlay={setShowAuthOverlay} />
      )}
    </div>
  );
};

export const ProductMainInfoSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((st) => st.products.singleProduct);
  const params = useParams();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delay = 1000;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          await GETOneProduct(params.id).then(async (r) => {
            dispatch(addSingleProduct(r));
            // get and save to redux reviews of observable product
            const reviews =
              r.reviews && r.reviews.length > 0
                ? await GETReviews({ _id: r.reviews })
                : [];
            dispatch(addReviews(reviews));
          });
        } catch (error) {
          console.log(`something wrong shop/ProductMainInfoSection/useEffect ${error}`);
        }
      };
      fetchData();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [product?.reviews.length]);

  return (
    <section
      className="w-full text-primary bg-primary flex flex-col mx-auto
                pb-16 pt-4 px-3 content-center mt-[4rem]"
    >
      <BreadcrumbAndNextPrevBtns />
      <div className="flex flex-col md:flex-row flex-nowrap justify-between [&>*]:w-full md:[&>*]:w-[48%]">
        <LeftPictureSide />
        <RightInfoSide />
      </div>
    </section>
  );
};
