import { Button, Slider } from "@/components";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const SliderSection: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push("/shop");
  };

  return (
    <Slider
      containerStyles={`w-full mt-[4rem]`}
      propSettings={{
        dotsClass:
          "absolute w-full bottom-10 flex flex-row justify-center space-x-4",
        fade: true,
        arrows: false,
      }}
    >
      {/* first slide */}
      <div className={`relative z-10`}>
        <img
          className="object-cover min-h-[450px] md:min-h-[580px] xl:min-h-[620px]"
          src="/home/slide1.1.webp"
          alt="first slide"
        />

        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/3 -translate-y-1/2 flex flex-col mx-2 font-bold font-[Quicksand]">
          <h4 className="mb-4 capitalize text-base tracking-widest animate-fadeInDown">
            WELCOME TO MELANIK'S SHOP
          </h4>
          <div className="mb-4 text-colorful text-5xl animate-fadeInLeft">
            Cakes & Sweets
          </div>
          <div className="mb-10 text-lg animate-fadeInRight">
            We Make Your Sweet Dreams Come True!
          </div>
          <Button
            type={"button"}
            buttonClasses={`text-base bg-primary border-2 w-40 h-12 uppercase transition-all duration-300 ease-in-out
              hover:text-colorful hover:border-white`}
            handleClick={handleClick}
          >
            {t("pages.home.shop now")}
          </Button>
        </div>
      </div>

      {/* second slide */}
      <div className={`relative z-10`}>
        <img
          className="object-cover min-h-[450px] md:min-h-[580px] xl:min-h-[620px]"
          src="/home/slide1.2.webp"
          alt="second slide"
        />

        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/3 -translate-y-1/2 flex flex-col mx-2 font-bold font-[Quicksand]">
          <h4 className="mb-4 capitalize text-base tracking-widest animate-fadeInDown">
            WELCOME TO MELANIK'S SHOP
          </h4>
          <div className="mb-4 text-colorful text-5xl animate-fadeInLeft">
            Special Chocolate
          </div>
          <div className="mb-10 text-xl animate-fadeInRight">
            We Make Your Sweet Dreams Come True!
          </div>
          <Button
            type={"button"}
            buttonClasses={`text-base bg-primary border-2 w-40 h-12 uppercase transition-all duration-300 ease-in-out
              hover:text-colorful hover:border-white`}
            handleClick={handleClick}
          >
            {t("pages.home.shop now")}
          </Button>
        </div>
      </div>
    </Slider>
  );
};
