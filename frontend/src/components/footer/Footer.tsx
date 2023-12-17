"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

import { Button } from "..";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Notification, ClosedMenu, OpenMenu } from "../../../public/svgs/index";

const customerLinks = [
  {
    name: "pagination",
    href: "pagination",
  },
  {
    name: "terms & conditions",
    href: "terms",
  },
  {
    name: "contact",
    href: "contact",
  },
  {
    name: "accessories",
    href: "accessories",
  },
  {
    name: "term of use",
    href: "term",
  },
];

const shopLinks = [
  {
    name: "about us",
    href: "about",
  },
  {
    name: "privacy policy",
    href: "policy",
  },
  {
    name: "terms & conditions",
    href: "terms",
  },
  {
    name: "products return",
    href: "returns",
  },
  {
    name: "wholesale policy",
    href: "wholesale",
  },
];

const companyLinks = [
  {
    name: "help center",
    href: "help",
  },
  {
    name: "address store",
    href: "address",
  },
  {
    name: "privacy policy",
    href: "privacy",
  },
  {
    name: "receivers & amplifiers",
    href: "receivers",
  },
  {
    name: "chocoostore",
    href: "chocoostore",
  },
];

const socialMediaLinks = [
  {
    name: "instagram",
    href: "/",
    icon: <InstagramIcon className="text-base transition-all duration-300" />,
  },
  {
    name: "instagram",
    href: "#",
    icon: <InstagramIcon className="text-base transition-all duration-300" />,
  },
];

export default function Footer(): ReactNode {
  const t = useTranslations("");

  return (
    <footer
      className={`w-full bg-primary text-primary mx-auto px-2 sm:px-6 lg:px-8
                flex flex-col sm:flex-row flex-wrap justify-center
      `}
    >
      {/* logo block */}
      <div
        className={`flex flex-col flex-wrap py-5 items-center 
                  md:items-center basis-auto sm:basis-full`}
      >
        <div className="flex items-center mb-4">
          <Link href={""}>
            <img className="h-8 w-auto" src="/logo.webp" alt="Choco" />
          </Link>
        </div>
        <div className="text-primary text-sm text-center font-bold mb-8 md:text-left">
          Subscribe our newsletter and get discount 30% off
        </div>
        <div className="flex flex-row flex-nowrap justify-center items-center gap-3">
          {socialMediaLinks.map((m, index) => (
            <Link href={`${m.href}`} key={`${m.name}_${index}`}>
              <div className="text-primary hover:text-colorful">{m.icon}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* customer links */}
      <div className="flex flex-col items-center py-5 sm:w-1/4">
        <h4
          className={`font-bold text-primary relative mb-8 
          after:bottom-0 after:left-0 after:absolute after:content-[''] after:w-10 after:border-b`}
        >
          Customer Care
        </h4>
        <div className="capitalize flex flex-col items-center text-primary text-sm leading-8">
          {customerLinks.map((l, index) => {
            return (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className="transition-all duration-300 hover:text-colorful"
              >
                {l.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* shop links */}
      <div className="flex flex-col items-center py-5 sm:w-1/4">
        <h4
          className={`font-bold text-primary relative mb-8 
          after:bottom-0 after:left-0 after:absolute after:content-[''] after:w-10 after:border-b`}
        >
          Customer Care
        </h4>
        <div className="capitalize flex flex-col items-center text-primary text-sm leading-8">
          {shopLinks.map((l, index) => {
            return (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className="transition-all duration-300 hover:text-colorful"
              >
                {l.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* company links */}
      <div className="flex flex-col items-center py-5 sm:w-1/4">
        <h4
          className={`font-bold text-primary relative mb-8 
          after:bottom-0 after:left-0 after:absolute after:content-[''] after:w-10 after:border-b`}
        >
          Customer Care
        </h4>
        <div className="capitalize flex flex-col items-center text-primary text-sm leading-8">
          {companyLinks.map((l, index) => {
            return (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className="transition-all duration-300 hover:text-colorful"
              >
                {l.name}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
