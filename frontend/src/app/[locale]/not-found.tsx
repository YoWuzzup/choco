import { Footer } from "@/components";
import { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center mt-[4rem] font-[Quicksand]">
      <div className="w-full my-24 flex flex-col items-center justify-center">
        <h2 className="text-8xl font-bold mb-5">404</h2>
        <p className="mb-2 font-semibold text-3xl">
          Oops! That Page Can’t Be Found.
        </p>
        <p className="mb-4 text-base text-paraPrimary uppercase">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXITS
        </p>
        <p className="mb-4 text-sm text-paraPrimary">
          Please return to{" "}
          <Link href={"/"} className="text-colorful">
            Home page
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Custom404;
