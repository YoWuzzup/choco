"use client";
import { Input } from "@/components";
import { ChangeEvent, useState } from "react";

const categories = [
  "Chocolate Bars",
  "Cups & Candy",
  "Handmade Confections",
  "Chocolate For Baking",
  "Chocolate Homemade",
];

const headerStyles = `w-full font-bold text-lg py-1 pl-2 mb-5 border-l-4 flex flex-row flex-nowrap items-center gap-3 after:content-[''] after:border-b-2 after:border-solid after:border-[#e6e6e6] after:w-full`;

export const CollectionSection: React.FC = () => {
  const [filterState, setFilterState] = useState<{
    search: string;
    price: number;
  }>({
    search: "",
    price: 0,
  });

  const handleFilterChange = (e: any) => {
    e.preventDefault();

    setFilterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    console.log(filterState);
  };

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
              value: filterState.search,
              className: "m-0 p-2 shadow-md",
            }}
          />
        </div>

        {/* categories filter */}
        <div className="flex-col">
          <h3 className={headerStyles}>Categories</h3>
          <ul className="p-2 shadow-md">
            {categories.map((c, i) => (
              <li
                className="h-8 text-sm hover:text-colorful cursor-pointer duration-300"
                onClick={handleFilterChange}
                key={`${c}_${i}`}
                id={c}
                data-name={c}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Price filter */}
        <div className={`flex flex-row flex-wrap justify-between`}>
          <h3 className={headerStyles}>Price</h3>
          <Input
            classNameContainer="relative w-2/5 h-12 flex items-center shadow-md"
            handleChange={handleFilterChange}
            label={{ htmlFor: "minPrice" }}
            input={{
              type: "number",
              name: "minPrice",
              id: "minPrice",
              placeholder: "min",
              value: filterState.price,
              className: "m-0 p-3 w-full",
            }}
          />

          <Input
            classNameContainer="relative w-2/5 h-12 flex items-center shadow-md"
            handleChange={handleFilterChange}
            label={{ htmlFor: "maxPrice" }}
            input={{
              type: "number",
              name: "maxPrice",
              id: "maxPrice",
              placeholder: "max",
              value: filterState.price,
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
