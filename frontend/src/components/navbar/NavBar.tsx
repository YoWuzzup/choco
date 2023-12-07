"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Button } from "..";
import { OpenMenuBtn } from "../../../public/svgs/openMenuBtn";

const links = [
  {
    name: "home",
    href: "#",
    current: true,
  },
  {
    name: "shop",
    href: "shop",
    current: false,
  },
  {
    name: "about us",
    href: "about",
    current: false,
  },
];

const isCurrent = (...classes: any) => classes.filter(Boolean).join("");

export default function NavBar(): ReactNode {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("asd");
  };

  const t = useTranslations("Index");

  return (
    <nav className="bg-primary">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center sm:hidden">
          {/* mobile menu button */}
          <Button type={"button"} buttonClasses={""} handleClick={handleClick}>
            {t("title")}
            <OpenMenuBtn />
          </Button>
        </div>
      </div>
    </nav>
  );
}
