import { Product } from "@/components";

const TODO = [
  { src: "/home/TODO.webp" },
  {},
  { src: "/home/TODO.webp" },
  {},
  { src: "/home/TODO.webp" },
  { src: "/home/TODO.webp" },
  { src: "/home/TODO.webp" },
  { src: "/home/TODO.webp" },
];

export const BestSellerSection: React.FC = () => {
  return (
    <section
      className={`w-full flex flex-col text-center justify-center items-center py-14 text-primary bg-primary`}
    >
      <h3 className="mb-5 text-5xl font-bold font-[Quicksand]">Best Seller</h3>
      <div className="w-3/4 text-gray mb-10">
        Best Seller Product This Week!
      </div>

      <div className="w-full px-2 lg:px-8 flex flex-wrap justify-center items-center gap-4 lg:gap-16 lg:justify-evenly">
        {TODO.map((p: any, i: number) => (
          <Product key={`${p}_${i}`} p={p} />
        ))}
      </div>
    </section>
  );
};
