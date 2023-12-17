import { Button } from "@/components";

export const BannerSection: React.FC = () => {
  return (
    <section className="w-full text-secondary bg-primary flex flex-col md:flex-row mx-auto px-2 lg:px-8">
      <div
        className={`basis-full bg-colorful px-8 py-10 flex flex-col justify-center items-start
        md:basis-4/6`}
      >
        <h3 className="font-bold text-3xl pb-4 ">
          Hot Chocolate Bombs Homemade
        </h3>
        <p className="mb-5">
          Hot chocolate bombs or hot cocoa bombs are cute lil balls of chocolate
          that you put into a mug. When you pour hot milk into the mug, the
          chocolate melts and magically releases the marshmallows and cocoa
          hiding inside.
        </p>
        <Button
          type={"button"}
          buttonClasses={`text-secondary bg-colorful border-2 w-40 h-12 uppercase transition-all duration-300 ease-in-out
                      outline-none focus:outline-none focus-visible:outline-none text-primary
                      hover:text-colorful hover:bg-primary`}
          handleClick={(e: any) => console.log("asd")}
        >
          Shop now
        </Button>
      </div>

      <div className="overflow-hidden">
        <img
          className="object-cover hover:scale-125 transition-all duration-700"
          src="/home/banner3.webp"
          alt=""
        />
      </div>
    </section>
  );
};
