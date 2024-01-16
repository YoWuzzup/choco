"use client";
import { GETProducts } from "@/api/products";
import { Button, Input, Product, Spinner } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addListOfProducts } from "@/redux/slices/productsSlice";
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
  const dispatch = useAppDispatch();
  const reduxListOfProducts = useAppSelector(
    (st) => st.products.listOfProducts
  );
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
    const value = e.target.value;

    router.replace(`${pathname}?${createQueryString(name, value)}`);

    if (!value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(name);

      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delay = 1000;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const queryParams = {
            search: searchQueryParam,
            categories: categoriesQueryParam,
            minprice: minpriceQueryParam,
            maxprice: maxpriceQueryParam,
          };

          const res = await GETProducts(queryParams);
          dispatch(addListOfProducts(res));
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
      className="w-full text-primary bg-primary flex flex-col sm:flex-row mx-auto
                py-8 px-10 content-center"
    >
      {/* filter container*/}
      <div
        className="basis-1/5 flex flex-row flex-wrap sm:flex-col text-primary items-center
      [&>*]:mb-5 [&>*]:flex"
      >
        {/* search filter */}
        <div className="w-full flex-col">
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
        <div className="w-full flex-col">
          <h3 className={headerStyles}>Categories</h3>
          <select
            value={categoriesQueryParam || ""}
            onChange={handleFilterChange}
            className="p-2 shadow-md"
            name="categories"
          >
            <option value={""}>Select all</option>
            {listOfCategories.map((option, index) => (
              <option key={`${option}_${index}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Price filter */}
        <div className={`w-full flex-row flex-wrap justify-between`}>
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

        <Button
          type={"button"}
          buttonClasses={`text-secondary bg-colorful border-2 rounded-full p-3
                      w-full h-12 uppercase transition-all duration-300 ease-in-out
                      text-primary flex items-center justify-center
                      hover:text-colorful hover:bg-primary`}
          handleClick={() => {
            window.scroll({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              router.push("/shop");
            }, 500);
          }}
        >
          Reset filter
        </Button>
      </div>

      {/* list of results */}
      <div className="basis-full flex flex-row items-start justify-evenly">
        {reduxListOfProducts ? (
          reduxListOfProducts.map((p, i) => <Product key={`${p}_${i}`} p={p} />)
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};
