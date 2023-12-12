import { Slider } from "@/components";

export const SliderSection: React.FC = () => {
  return (
    <Slider
      containerStyles={`w-full`}
      propSettings={{ dotsClass: "flex flex-col" }}
    >
      <div className={`relative`}>
        <img
          className="object-cover min-h-[450px] md:min-h-[580px] xl:min-h-[620px]"
          src="/home/slide1.1.webp"
          alt="first slide"
        />

        <div className="absolute top-0 left-5">asd</div>
      </div>
      <div>
        <img
          className="h-8 w-auto"
          src="/home/slide1.2.webp"
          alt="second slide"
        />
      </div>
    </Slider>
  );
};
