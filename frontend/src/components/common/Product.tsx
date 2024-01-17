"use client";
import Link from "next/link";
import { Button } from "@/components";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type TPropduct = {
  img: { src: string; alt: string } | null;
  name: string;
  price: string | number;
  currency: string;
  id: string;
};

export const Product: React.FC<TPropduct> = (props) => {
  return (
    <div
      className={`basis-full sm:basis-10/12 md:basis-5/12 lg:basis-3/12 relative 
                overflow-hidden flex flex-col justify-center items-start group`}
    >
      <Link href={`shop/${props.id}`}>
        {props.img ? (
          <div className="mb-5 w-full h-full">
            <img
              className="object-cover"
              src={props.img.src}
              alt={props.img.alt}
            />
          </div>
        ) : (
          <div
            className={`animate-pulse
                flex items-center justify-center w-full h-60 bg-gray-300 rounded 
                `}
          >
            <svg
              className="w-full h-full text-gray-200 dark:text-gray-600"
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
          <Link href={`shop/${props.id}`}>{props.name}</Link>
        </div>
        <div className="text-colorful">
          {props.currency} {props.price}
        </div>
      </div>

      <div
        className={`absolute w-16 top-10 right-0 invisible opacity-0 
            transition-all translate-x-full duration-300 flex flex-col gap-2
            group-hover:visible 
            group-hover:translate-x-0 group-hover:opacity-100`}
      >
        <Button
          type={"button"}
          buttonClasses={""}
          handleClick={(e) => {
            console.log("asd");
          }}
        >
          <FavoriteBorderOutlinedIcon
            className={`text-primary w-11 h-11 p-2
                    transition-all duration-300 bg-primary
                    hover:text-secondary hover:bg-[#bc8157] rounded-full shadow-md
                    `}
          />
        </Button>

        <Button
          type={"button"}
          buttonClasses={""}
          handleClick={(e) => {
            console.log("asd");
          }}
        >
          <ShoppingBagOutlinedIcon
            className={`text-primary w-11 h-11 p-2
                    transition-all duration-300 bg-primary
                    hover:text-secondary hover:bg-[#bc8157] rounded-full shadow-md
                    `}
          />
        </Button>
      </div>
    </div>
  );
};
