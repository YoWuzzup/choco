import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const companyLinks = [
  {
    name: "about us",
    href: "about",
  },
  {
    name: "help center",
    href: "mailto: ",
  },
  {
    name: "our store",
    href: "shop",
  },
];

const socialMediaLinks = [
  {
    name: "instagram",
    href: `${process.env.NEXT_PUBLIC_INSTAGRAM_LINK}`,
    icon: (
      <InstagramIcon className="text-primary hover:text-colorful text-2lg transition-all duration-300" />
    ),
  },
  {
    name: "facebook",
    href: `${process.env.NEXT_PUBLIC_FACEBOOK_LINK}`,
    icon: (
      <FacebookIcon className="text-primary hover:text-colorful text-2lg transition-all duration-300" />
    ),
  },
];

export default function Footer(): ReactNode {
  const t = useTranslations("");

  return (
    <footer
      className={`w-full bg-primary text-primary mx-auto mb-10 px-2 sm:px-6 lg:px-8
                flex flex-col sm:flex-row flex-wrap justify-center
                border-b border-[#ddd] border-solid`}
    >
      {/* quick links */}
      <div className="flex flex-col items-center py-5 sm:w-1/3 capitalize">
        <h4
          className={`font-bold text-primary relative mb-8 
          after:bottom-0 after:left-0 after:absolute after:content-[''] after:h-[2px] 
          after:w-10 after:translate-y-4 after:bg-colorful`}
        >
          {t(`footer.company.header`)}
        </h4>
        <div className="capitalize flex flex-col items-center text-primary text-sm leading-8 text-center">
          {companyLinks.map((l, index) => {
            return (
              <Link
                href={l.href}
                key={`${l.name}_${index}`}
                className="transition-all duration-300 hover:text-colorful"
              >
                {t(`footer.company.${l.name}`)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* logo block */}
      <div
        className={`flex flex-col flex-wrap py-5 px-4 items-center sm:w-1/3 md:items-center
              sm:border-l sm:border-r sm:border-solid sm:border-[#ddd]`}
      >
        <div className="flex items-center mb-4">
          <Link href={"/"}>
            <img className="h-32 w-auto" src="/logo.png" alt="Melanik's cake" />
          </Link>
        </div>
        <div className="text-primary text-sm text-center font-bold mb-8">
          Subscribe our newsletter and get discount 10% off
        </div>
      </div>

      {/* follow us */}
      <div className="flex flex-col items-center py-5 sm:w-1/3">
        <h4
          className={`font-bold text-primary relative mb-8 capitalize text-left
          after:bottom-0 after:left-0 after:absolute after:content-[''] after:h-[2px] 
          after:w-10 after:translate-y-4 after:bg-colorful`}
        >
          {t(`footer.follow us.header`)}
        </h4>
        <div className="flex flex-col items-center text-primary text-sm leading-8 text-center gap-4">
          <a
            href={`tel:$`}
            className="text-sm font-bold hover:text-colorful duration-300"
          >
            {process.env.NEXT_PUBLIC_TELEPHONE}
          </a>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className="text-sm font-bold hover:text-colorful duration-300"
          >
            {process.env.NEXT_PUBLIC_EMAIL}
          </a>
          <div className="flex flex-row flex-nowrap justify-center items-center gap-3">
            {socialMediaLinks.map((m, index) => (
              <Link href={`${m.href}`} key={`${m.name}_${index}`}>
                {m.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
