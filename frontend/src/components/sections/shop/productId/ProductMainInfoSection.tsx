"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useAppDispatch } from "@/hooks/redux";
import { removeListOfProducts } from "@/redux/slices/productsSlice";
import { Breadcrumb, Button, Slider } from "@/components";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const currencies: {
  readonly [key: string]: string;
} = {
  en: "$",
  pl: "zł",
  ru: "zł",
};

const BreadcrumbAndNExtPrevBtns: React.FC = () => {
  return (
    <div className="w-full mb-8 flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center">
      <Breadcrumb
        crumbs={[
          { name: "home", href: "/" },
          { name: "shop", href: "/shop" },
          { name: "string", href: "/" },
        ]}
      />

      <div
        className="flex flex-nowrap justify-center items-center basis-full sm:basis-auto
                      mt-4 sm:mt-0"
      >
        <Button
          type={"button"}
          buttonClasses={`capitalize text-[10px] mr-4 flex flex-nowrap justify-center 
              items-center hover:text-colorful transition-all duration-300`}
          handleClick={() => console.log("TODO")}
        >
          <NavigateBeforeIcon />
          PREV
        </Button>
        <div className="after:content-[''] after:border-2 after:border-gray" />
        <Button
          type={"button"}
          buttonClasses={`capitalize text-[10px] ml-4 flex flex-nowrap justify-center 
              items-center hover:text-colorful transition-all duration-300`}
          handleClick={() => console.log("TODO")}
        >
          NEXT
          <NavigateNextIcon />
        </Button>
      </div>
    </div>
  );
};

const LeftPictureSide: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Slider
        propSettings={{
          dots: false,
        }}
      >
        <div className={`relative`}>
          <img
            className="object-cover"
            src="/home/slide1.1.webp"
            alt="first slide"
          />
        </div>
        <div className={`relative`}>
          <img
            className="object-cover"
            src="/home/slide1.1.webp"
            alt="first slide"
          />
        </div>
        <div className={`relative`}>
          <img
            className="object-cover"
            src="/home/slide1.1.webp"
            alt="first slide"
          />
        </div>
        <div className={`relative`}>
          <img
            className="object-cover"
            src="/home/slide1.1.webp"
            alt="first slide"
          />
        </div>
      </Slider>
    </div>
  );
};

const RightInfoSide: React.FC = () => {
  const size = ["8 piece", "12 piece"];
  const [activeSize, setActiveSize] = useState<null | string>("8 piece");
  const color = ["pink", "orange", "black-yellow", "brown-yellow-pink-blue"];
  const [activeColor, setActiveColor] = useState<null | string>("pink");

  return (
    <div className="flex flex-col justify-start items-center [&>*:basis-full]">
      {/* name and like */}
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="text-2xl font-bold text-primary">Header</h3>
        <Button
          type={"button"}
          buttonClasses={""}
          handleClick={(e) => {
            console.log("asd");
          }}
        >
          <FavoriteBorderOutlinedIcon
            className={`text-primary w-10 h-10 p-2
                    transition-all duration-300 bg-primary
                    hover:text-secondary hover:bg-colorful rounded-full shadow-md
                    `}
          />
        </Button>
      </div>

      {/* price and review */}
      <div
        className="flex flex-col justify-start w-full pb-6 mb-5
                  border-b-[1px] border-[#e7e7e7] border-solid"
      >
        <div className="capitalize text-xl text-colorful font-bold mb-4">
          $Currency
        </div>
        <div className="text-xs text-[#999] font-normal">$No reviews</div>
      </div>

      {/*  info para */}
      <div>
        <p className="text-sm text-[#a8a8a8] pb-5">
          three main types of chocolate here are three main types of chocolate —
          white chocolate, milk chocolate, and dark chocolate. Everyone has
          their favorite, go-to flavor. But, how much do you actually know about
          the different kinds of chocolate? Do you know what differentiates
          semisweet from bittersweet? Or why white...
        </p>
      </div>

      {/* options */}
      {size && (
        <div className="w-full mb-5 flex flex-row flex-nowrap gap-2">
          <div
            className="text-[11px] w-6 text-primary font-bold uppercase relative mr-5 pb-2 h-fit
          after:bottom-0 after:left-0 after:absolute after:content-[''] 
          after:w-10 after:border-b"
          >
            size
          </div>
          {size.map((s, i) => (
            <div
              key={`${s}_${i}`}
              className={`py-2 px-4 border-solid border-[1px] border-black cursor-pointer
              transition-all duration-300 hover:bg-secondary hover:text-secondary
              ${activeSize === s ? "bg-secondary" : "bg-primary"}
              ${activeSize === s ? "text-secondary" : "text-primary"}`}
              onClick={() => setActiveSize(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {color && (
        <div className="w-full mb-5 flex flex-row flex-nowrap gap-6">
          <div
            className="text-[11px] w-6 text-primary font-bold uppercase relative mr-5 pb-2 h-fit
          after:bottom-0 after:left-0 after:absolute after:content-[''] 
          after:w-10 after:border-b"
          >
            color
          </div>
          {color.map((c, i) => {
            const colorArray = c.split("-");
            const arrayLength = colorArray.length;
            const gradientColors = colorArray
              .map((color, index) => {
                const mindegrees = (index / arrayLength) * 360;
                const maxdegrees = (360 / arrayLength) * (index + 1);

                return `${color} ${mindegrees}deg ${maxdegrees}deg`;
              })
              .join(",");

            return (
              <div
                key={`${c}_${i}`}
                className={`relative rounded-full cursor-pointer transition-all duration-300 w-9 h-9 p-2
                        after:bottom-1/2 after:left-1/2 after:absolute after:content-[''] 
                        after:w-12 after:h-12 after:rounded-full after:border-2 after:border-[#b0b0b0]
                        after:-translate-x-1/2 after:translate-y-1/2`}
                style={{
                  background: `conic-gradient(${gradientColors})`,
                }}
                onClick={() => setActiveColor(c)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ProductMainInfoSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCurrency = currencies[locale] || "$";

  const handleFilterChange = (e: any) => {
    e.preventDefault();

    const name = e.target.id || e.target.name;
    const value = e.target.value;

    router.replace(`${pathname}`);

    if (!value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(name);

      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    dispatch(removeListOfProducts());
    let timer: NodeJS.Timeout;
    const delay = 1000;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
        } catch (error) {
          console.log(`something wrong shop/useEffect ${error}`);
        }
      };
      fetchData();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      className="w-full text-primary bg-primary flex flex-col mx-auto
                pb-16 pt-4 px-3 content-center"
    >
      <BreadcrumbAndNExtPrevBtns />
      <div className="flex flex-col md:flex-row flex-nowrap justify-between [&>*]:w-[48%]">
        <LeftPictureSide />
        <RightInfoSide />
      </div>
    </section>
  );
};
