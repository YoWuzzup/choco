import { Button } from "@/components";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const BannerSection: React.FC = () => {
  const t = useTranslations("");
  const router = useRouter();

  return (
    <section className="w-full text-secondary bg-primary flex flex-col md:flex-row mx-auto">
      <div
        className={`basis-full bg-colorful px-8 py-10 flex flex-col justify-center items-start
        md:basis-4/6`}
      >
        <h3 className="font-bold text-3xl pb-4 first-letter:uppercase">
          {t(`pages.home.banner.header`)}
        </h3>
        <p className="mb-5 first-letter:uppercase">
          {t(`pages.home.banner.description`)}
        </p>
        <Button
          type={"button"}
          buttonClasses={`text-secondary bg-colorful border-2 w-40 h-12 uppercase transition-all duration-300 ease-in-out
                      outline-none focus:outline-none focus-visible:outline-none text-primary
                      hover:text-colorful hover:bg-primary`}
          handleClick={() => router.push("/shop")}
        >
          {t(`pages.home.shop now`)}
        </Button>
      </div>

      <div className="overflow-hidden w-full md:w-2/6">
        <img
          className="object-cover hover:scale-125 transition-all duration-700 w-full h-full"
          src="/home/IMG_4449.jpg"
          alt="suggesting"
        />
      </div>
    </section>
  );
};
