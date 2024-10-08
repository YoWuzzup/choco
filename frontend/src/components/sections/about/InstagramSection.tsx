"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Slider } from "@/components";
import { useScreenSize } from "@/hooks/useScreenSize";

import InstagramIcon from "@mui/icons-material/Instagram";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const posts = [
  "/about/cake pops.jpg",
  "/about/cakes.jpg",
  "/about/cupcakes.jpg",
  "/about/mochi_mochi.jpg",
];

const CustomPrevArrow = (props: any) => (
  <div
    className="group absolute top-1/2 left-5 -translate-y-1/2 rounded-full bg-primary w-10 h-10
            hover:bg-colorful z-30 flex justify-center items-center transition-all duration-500
            cursor-pointer"
    onClick={props.onClick}
  >
    <NavigateBeforeIcon className="text-primary group-hover:text-secondary transition-all duration-500" />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div
    className="group absolute top-1/2 right-5 -translate-y-1/2 rounded-full bg-primary w-10 h-10
            hover:bg-colorful z-30 flex justify-center items-center transition-all duration-500
            cursor-pointer"
    onClick={props.onClick}
  >
    <NavigateNextIcon className="text-primary group-hover:text-secondary transition-all duration-500" />
  </div>
);

export const InstagramSection: React.FC = () => {
  const { width } = useScreenSize();
  const t = useTranslations();

  return (
    <section
      className={`w-full flex flex-col text-center justify-center items-center py-10 text-primary bg-primary`}
    >
      <h3
        className="mb-3 text-5xl font-light font-[Quicksand] 
                    first-latter:capitalize"
      >
        Instagram
      </h3>
      <div
        className="relative w-4/5 pb-6 mb-12 text-base text-[#666]
                    after:content-[''] after:absolute after:h-[2px] after:w-16
                    after:bg-colorful after:bottom-0 after:right-1/2 after:translate-x-2/4
                    after:transition-all"
      >
        {t("pages.about.instagram.subheader")}
      </div>

      <Slider
        containerStyles={`${width > 620 ? "w-full" : "w-80"}`}
        propSettings={{
          dots: false,
          slidesToShow:
            width < 620 ? 1 : width < 960 ? 2 : width < 1300 ? 3 : 4,
          arrows: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        }}
      >
        {posts.map((p, i) => (
          <div key={`${p}_${i}`} className="relative group/image w-full h-80">
            <img
              alt={`instagram ${i}`}
              src={`${p}`}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-0 left-0 w-full h-80 bg-secondary opacity-0 
                        flex justify-center items-center transition-all duration-500
                        group-hover/image:opacity-70"
            />
            <Link href={`${process.env.NEXT_PUBLIC_INSTAGRAM_LINK}`}>
              <InstagramIcon
                className="absolute w-32 h-32 p-6 top-1/2 left-1/2 text-5xl -translate-x-1/2 -translate-y-1/2 
                  text-secondary transition-all duration-500 group-hover/image:text-colorful"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};
