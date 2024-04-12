"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useRef, useState } from "react";

import {
  ClosedMenu,
  OpenMenu,
  AvatarPlaceholder,
} from "../../../public/svgs/index";
import { useAppSelector } from "@/hooks/redux";
import { useOnClickOutside } from "usehooks-ts";
import { AuthOverlay, Button } from "..";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { usePathname, useRouter } from "next/navigation";

const links = () => {
  // TODO: translation
  const t = useTranslations("");

  return [
    {
      text: `home`,
      name: "home",
      href: "/",
    },
    {
      text: `shop`,
      name: "shop",
      href: "/shop",
    },
    {
      text: `about us`,
      name: "about",
      href: "/about",
    },
  ];
};

const languagesDropdown = ["en", "ru", "pl"];

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
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();
  const profileMenuRef = useRef(null);
  const languageMenuRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false);
  const [languageMenuIsOpen, setLanguageMenuIsOpen] = useState<boolean>(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState<boolean>(false);
  const user = useAppSelector((st) => st.user);

  const handleMobileMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setMenuIsOpen((prev) => !prev);
  };

  const handleLanguages = (e: React.MouseEvent<any>) => {
    e.preventDefault();

    setLanguageMenuIsOpen((prev) => !prev);
  };

  const handleProfileMenuClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();

    setProfileMenuIsOpen((prev) => !prev);
  };

  const t = useTranslations("");

  useOnClickOutside(
    languageMenuRef,
    () => {
      setLanguageMenuIsOpen(false);
    },
    "mouseup"
  );

  useOnClickOutside(
    profileMenuRef,
    () => {
      setProfileMenuIsOpen(false);
    },
    "mouseup"
  );

  return (
    <nav className={`bg-primary w-screen fixed z-20`}>
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
                <img className="w-auto h-16" src="/logo.png" alt="Choco" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex justify-center items-center">
              <div className="flex space-x-4 text-primary uppercase">
                {links().map((l, index) => (
                  <Link
                    href={l.href}
                    key={`${l.name}_${index}`}
                    className="relative inline-block transition-all ease-in-out delay-150 pb-1 
                    hover:text-colorful hover:after:w-full
                    after:content-[''] after:absolute after:h-[2px] after:w-0
                    after:bg-colorful after:bottom-0 after:left-0
                    after:transition-all"
                  >
                    {l.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* cart, language and profile buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center justify-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* language dropdown */}
            <div className="relative w-auto h-10">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-colorfulColor">
                <span className="sr-only">{t(`languages.${locale}`)}</span>
                <Button
                  type={"button"}
                  buttonClasses={
                    "w-full h-full outline-none focus:outline-none focus-visible:outline-none"
                  }
                  handleClick={handleLanguages}
                >
                  {locale}
                </Button>
              </div>

              {languageMenuIsOpen ? (
                <div
                  className="absolute right-0 top-10 z-10 mt-2 w-48 origin-top-right rounded-md 
                      bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-primary
                      focus:outline-none"
                  role="language"
                  aria-orientation="vertical"
                  aria-labelledby="user-language-button"
                  tabIndex={-1}
                  ref={languageMenuRef}
                  onClick={(e) => handleLanguages(e)}
                >
                  {/* TODO: make changing language to keep the page */}
                  {languagesDropdown.map((l, index) => (
                    <Link
                      href={`/${l}`}
                      key={`${l}_${index}`}
                      className="block px-4 py-2 text-sm hover:text-colorful capitalize"
                      role="menuitem"
                      tabIndex={-1}
                      id={`user-language-${l}`}
                    >
                      {t(`languages.${l}`)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Profile dropdown */}
            {/* if no user show log in/up form/overlay if user is logged in show use menu */}
            {!user ? (
              <div className="relative w-auto h-10 overflow-hidden">
                <Button
                  type={"button"}
                  buttonClasses={`h-full outline-none focus:outline-none focus-visible:outline-none
                    p-2 flex items-center juntify-center duration-200 text-primary hover:text-colorful
                    text-2xl sm:text-4xl`}
                  handleClick={() => setShowAuthOverlay(true)}
                >
                  <AccountCircleOutlinedIcon fontSize="inherit" />
                </Button>
              </div>
            ) : (
              // user menu
              <div className="ml-3 flex flex-row flex-nowrap gap-5">
                <Button
                  type={"button"}
                  buttonClasses={
                    "relative outline-none focus:outline-none focus-visible:outline-none text-primary"
                  }
                  handleClick={() => router.push("/profile/cart")}
                >
                  <div className="absolute left-4 top-4">
                    <p className="sr-only">{t(`links.cart`)}</p>
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-colorful p-3 text-xs text-white">
                      {user?.cart?.length}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="file: h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
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
          menuIsOpen ? "h-40 opacity-1" : "h-0 opacity-0"
        } block sm:hidden`}
        id="mobile-menu"
      >
        <div className="flex flex-1 flex-col space-y-1 px-2 pb-3 pt-2">
          {links().map(
            (
              l: { name: string; href: string; text: string },
              index: number
            ) => (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className={`${
                  path.includes(l.name)
                    ? "bg-secondary text-colorful"
                    : "bg-pramary text-primary"
                } block rounded-md px-3 py-2 font-medium
                hover:bg-colorful hover:text-primary`}
                aria-current={path.includes(l.name) ? "page" : undefined}
              >
                {l.text}
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
