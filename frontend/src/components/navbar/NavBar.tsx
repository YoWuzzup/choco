"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

import { Button } from "..";
import { Notification, ClosedMenu, OpenMenu } from "../../../public/svgs/index";

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

const dropdown = [
  {
    name: "my profile",
    href: "profile",
  },
  {
    name: "settings",
    href: "settings",
  },
  {
    name: "sign out",
    href: "",
  },
];

export default function NavBar(): ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false);

  const handleMobileMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setMenuIsOpen((prev) => !prev);
  };

  const handleProfileMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setProfileMenuIsOpen((prev) => !prev);
  };

  const t = useTranslations("");

  return (
    <nav className={`bg-primary w-full fixed`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button with icons*/}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Button
              type={"button"}
              buttonClasses={
                "text-primary outline-none focus:outline-none focus-visible:outline-none"
              }
              handleClick={handleMobileMenuClick}
            >
              {menuIsOpen ? <ClosedMenu className="h-6 w-6" /> : <OpenMenu />}
            </Button>
          </div>

          {/* Links to other pages and logo img*/}
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
            <div className="flex flex-shrink-0 items-center">
              <Link href={""}>
                <img className="h-8 w-auto" src="/logo.webp" alt="Choco" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-primary uppercase">
                {links.map((l, index) => (
                  <Link
                    href={l.href}
                    key={`${l.name}_${index}`}
                    className="relative inline-block transition-all ease-in-out delay-150 pb-1 
                    hover:text-colorful hover:after:w-full
                    after:content-[''] after:absolute after:h-[2px] after:w-0
                    after:bg-colorful after:bottom-0 after:left-0
                    after:transition-all"
                  >
                    {t(`links.${l.name}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Notification and profile buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Button
              type={"button"}
              buttonClasses={
                "outline-none focus:outline-none focus-visible:outline-none text-primary"
              }
              handleClick={(e) => {
                console.log("TODO");
              }}
            >
              <span className="sr-only">
                {t(`notifications.notifications`)}
              </span>
              {<Notification className="h-6 w-6" />}
            </Button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div className="flex">
                <span className="sr-only">{t(`user menu.open menu`)}</span>
                <Button
                  type={"button"}
                  buttonClasses={
                    "outline-none focus:outline-none focus-visible:outline-none"
                  }
                  handleClick={handleProfileMenuClick}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="avatar"
                  />
                </Button>
              </div>

              {profileMenuIsOpen ? (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
                  bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-primary
                  focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {dropdown.map((l, index) => (
                    <Link
                      href={l.href}
                      key={`${l.name}_${index}`}
                      className="block px-4 py-2 text-sm hover:text-colorful capitalize"
                      role="menuitem"
                      tabIndex={-1}
                      id={`user-menu-item-${index}`}
                    >
                      {t(`user menu.${l.name}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
          menuIsOpen ? "h-40" : "h-0"
        }
        ${menuIsOpen ? "opacity-1" : "opacity-0"}`}
        id="mobile-menu"
      >
        <div className="flex flex-1 flex-col space-y-1 px-2 pb-3 pt-2">
          {links.map(
            (
              l: { name: string; href: string; current: boolean },
              index: number
            ) => (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className={`bg-${l.current ? "secondary" : "pramary"} text-${
                  l.current ? "colorful" : "primary"
                }
                block rounded-md px-3 py-2 font-medium
                hover:bg-colorful hover:text-primary`}
                aria-current={l.current ? "page" : undefined}
              >
                {t(`links.${l.name}`)}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
