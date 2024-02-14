"use client";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const menu = () => {
  const t = useTranslations("");

  return [
    {
      header: `start`,
      tabs: [
        {
          text: `dashboard`,
          icon: `<DashboardOutlinedIcon />`,
          url: "/profile/",
          name: "dashboard",
        },
        {
          text: `likes`,
          icon: `<StarBorderIcon />`,
          url: "/profile/bookmarks",
          name: "bookmarks",
        },
        {
          text: `cart`,
          icon: `<StarBorderIcon />`,
          url: "/profile/cart",
          name: "cart",
        },
      ],
    },
    {
      header: `account`,
      tabs: [
        {
          text: `settings`,
          icon: `<SettingsOutlinedIcon />`,
          url: "/profile/settings",
          name: "settings",
        },
        {
          text: `logout`,
          icon: `<LogoutIcon />`,
          url: "/auth/signout",
          name: "logout",
        },
      ],
    },
  ];
};

export const ProfileMenu: React.FC = () => {
  const path = usePathname();

  return (
    <div
      className="flex flex-row flex-wrap gap-2 h-auto w-full shadow-xl fixed top-0 left-0 px-3 pt-[4rem] 
            xl:w-2/12 sm:flex-col sm:h-screen sm:w-3/12"
    >
      {menu().map((m, i) => {
        return (
          <div key={`${m.header}_${i}`}>
            <h3 className="text-colorful capitalize mb-2 text-lg hidden sm:block">
              {m.header}
            </h3>
            <div className="w-full flex flex-row sm:flex-col">
              {m.tabs?.map((t, idx) => {
                return (
                  <Link
                    key={`${t.name}_${idx}`}
                    href={`${t.url}`}
                    className={`capitalize p-2 mb-1 text-sm duration-200 rounded-md hover:bg-secondary hover:text-colorful
                    ${
                      path.includes(t.name)
                        ? "bg-secondary text-colorful"
                        : "bg-primary text-primary"
                    }`}
                  >
                    {t.text}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
