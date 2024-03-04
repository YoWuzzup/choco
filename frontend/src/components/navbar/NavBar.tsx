"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode, useRef, useState } from "react";

import {
  Notification,
  ClosedMenu,
  OpenMenu,
  AvatarPlaceholder,
} from "../../../public/svgs/index";
import { useAppSelector } from "@/hooks/redux";
import { AuthOverlay, Button } from "..";
import { useOnClickOutside } from "usehooks-ts";

const links = [
  {
    name: "home",
    href: "/",
    current: true,
  },
  {
    name: "shop",
    href: "/shop",
    current: false,
  },
  {
    name: "about us",
    href: "/about",
    current: false,
  },
];

const dropdown = [
  {
    name: "my profile",
    href: "/profile",
  },
  {
    name: "settings",
    href: "/profile/settings",
  },
  {
    name: "sign out",
    href: "/auth/signout",
  },
];

export default function NavBar(): ReactNode {
  const profileMenuRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);
  const user = useAppSelector((st) => st.user);

  const handleMobileMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setMenuIsOpen((prev) => !prev);
  };

  const handleProfileMenuClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();

    setProfileMenuIsOpen((prev) => !prev);
  };

  const t = useTranslations("");

  useOnClickOutside(
    profileMenuRef,
    () => {
      setProfileMenuIsOpen(false);
    },
    "mouseup"
  );

  return (
    <nav className={`bg-primary w-full fixed z-20`}>
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
              <Link href={"/"}>
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
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {/* if no user show log in/up form/overlay if user is logged in show use menu */}
            {!user ? (
              <div className="relative w-10 h-10 overflow-hidden bg-gray rounded-full dark:bg-gray">
                <Button
                  type={"button"}
                  buttonClasses={
                    "w-full h-full outline-none focus:outline-none focus-visible:outline-none"
                  }
                  handleClick={() => setShowAuthOverlay(true)}
                >
                  <AvatarPlaceholder />
                </Button>
              </div>
            ) : (
              // user menu
              <div className="ml-3 flex flex-row flex-nowrap gap-3">
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

                <div className="relative w-10 h-10 overflow-hidden bg-gray rounded-full dark:bg-gray">
                  <span className="sr-only">{t(`user menu.open menu`)}</span>
                  <Button
                    type={"button"}
                    buttonClasses={
                      "w-full h-full outline-none focus:outline-none focus-visible:outline-none"
                    }
                    handleClick={handleProfileMenuClick}
                  >
                    {user.avatar ? (
                      <img
                        className="h-full w-full"
                        src={
                          user?.avatar instanceof File
                            ? URL.createObjectURL(user?.avatar)
                            : typeof user?.avatar === "object"
                            ? `data:${user?.avatar.mimetype};base64,${user?.avatar.buffer}`
                            : `${user?.avatar}`
                        }
                        alt="avatar"
                      />
                    ) : (
                      <AvatarPlaceholder className="h-full w-full rounded-full" />
                    )}
                  </Button>
                </div>

                {profileMenuIsOpen ? (
                  <div
                    className="absolute right-0 top-10 z-10 mt-2 w-48 origin-top-right rounded-md 
                      bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-primary
                      focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                    ref={profileMenuRef}
                    onClick={(e) => handleProfileMenuClick(e)}
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
            )}
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

      {showAuthOverlay && (
        <AuthOverlay setShowAuthOverlay={setShowAuthOverlay} />
      )}
    </nav>
  );
}
