import { Footer } from "@/components";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Custom404: NextPage = () => {
  const t = useTranslations("");

  return (
    <div className="flex flex-col h-full items-center justify-center mt-[4rem] font-[Quicksand]">
      <div className="w-full my-24 flex flex-col items-center justify-center">
        <h2 className="text-8xl font-bold mb-5">404</h2>
        <p className="mb-2 font-semibold text-3xl capitalize">
          {t(`pages.404.not found`)}
        </p>
        <p className="mb-4 text-base text-paraPrimary uppercase">
          {t(`pages.404.info`)}
        </p>
        <p className="mb-4 text-sm text-paraPrimary capitalize">
          {t(`pages.404.return`)} {` `}
          <Link href={"/"} className="text-colorful">
            {t(`pages.home.home page`)}
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Custom404;
