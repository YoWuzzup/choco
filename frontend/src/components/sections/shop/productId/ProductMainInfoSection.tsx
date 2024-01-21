"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useAppDispatch } from "@/hooks/redux";
import { removeListOfProducts } from "@/redux/slices/productsSlice";
import { Breadcrumb, Button } from "@/components";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const currencies: {
  readonly [key: string]: string;
} = {
  en: "$",
  pl: "zł",
  ru: "zł",
};

const BreadcrumbAndNExtPrevBtns: React.FC = () => {
  return (
    <div className="w-full mb-8 flex flex-nowrap justify-between items-center">
      <Breadcrumb
        crumbs={[
          { name: "home", href: "/" },
          { name: "shop", href: "/shop" },
          { name: "string", href: "/" },
        ]}
      />

      <div className="flex flex-nowrap justify-center items-center">
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
      className="w-full text-primary bg-primary flex flex-col gap-5 sm:flex-row mx-auto
                pb-16 pt-4 px-3 content-center"
    >
      <BreadcrumbAndNExtPrevBtns />
    </section>
  );
};
