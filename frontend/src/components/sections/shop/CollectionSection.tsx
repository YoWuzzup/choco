"use client";
import { Input } from "@/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const listOfCategories = [
  "Chocolate Bars",
  "Cups & Candy",
  "Handmade Confections",
  "Chocolate For Baking",
  "Chocolate Homemade",
];

const headerStyles = `w-full font-bold text-lg py-1 pl-2 mb-5 border-l-4 flex flex-row flex-nowrap items-center gap-3 after:content-[''] after:border-b-2 after:border-solid after:border-[#e6e6e6] after:w-full`;

export const CollectionSection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchQueryParam = searchParams.get("search");
  const categoriesQueryParam = searchParams.get("categories");
  const minpriceQueryParam = searchParams.get("minprice");
  const maxpriceQueryParam = searchParams.get("maxprice");

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (e: any) => {
    e.preventDefault();

    const name = e.target.id || e.target.name;

    router.replace(`${pathname}?${createQueryString(name, e.target.value)}`);
  };

  // TODO: try this func
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delay = 500;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          console.log("i feched");
        } catch (error) {
          console.log(`something wrong shop/useEffect ${error}`);
        }
      };
      fetchData();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams]);

  return (
    <section
      className="w-11/12 text-primary bg-primary flex flex-col sm:flex-row mx-auto
                py-8 items-center justify-between"
    >
      {/* filter container*/}
      <div
        className="basis-1/5 flex flex-col text-primary 
      [&>*]:mb-5 [&>*]:flex [&>*]:basis-full"
      >
        {/* search filter */}
        <div className="flex-col">
          <h3 className={headerStyles}>Search</h3>
          <Input
            classNameContainer="relative w-full h-12 flex items-center"
            handleChange={handleFilterChange}
            label={{ htmlFor: "search" }}
            input={{
              type: "search",
              name: "search",
              id: "search",
              placeholder: "Searching...",
              value: searchQueryParam || "",
              className: "w-full m-0 p-2 shadow-md",
            }}
          />
        </div>

        {/* categories filter */}
        <div className="flex-col">
          <h3 className={headerStyles}>Categories</h3>
          <select
            value={categoriesQueryParam ?? ""}
            onChange={handleFilterChange}
            className="p-2 shadow-md"
            name="categories"
          >
            <option value="" disabled>
              Select an option
            </option>
            {listOfCategories.map((option, index) => (
              <option key={`${option}_${index}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Price filter */}
        <div className={`flex flex-row flex-wrap justify-between`}>
          <h3 className={headerStyles}>Price</h3>
          <Input
            classNameContainer="relative w-2/5 h-12 flex items-center shadow-md"
            handleChange={handleFilterChange}
            label={{ htmlFor: "minprice" }}
            input={{
              type: "number",
              name: "minprice",
              id: "minprice",
              placeholder: "0",
              value: minpriceQueryParam || "",
              className: "m-0 p-3 w-full",
            }}
          />

          <Input
            classNameContainer="relative w-2/5 h-12 flex items-center shadow-md"
            handleChange={handleFilterChange}
            label={{ htmlFor: "maxprice" }}
            input={{
              type: "number",
              name: "maxprice",
              id: "maxprice",
              placeholder: "1000",
              value: maxpriceQueryParam || "",
              className: "m-0 p-3 w-full",
            }}
          />
        </div>
      </div>

      {/* list if results */}
      <div className="basis-3/4">asd</div>
    </section>
  );
};
