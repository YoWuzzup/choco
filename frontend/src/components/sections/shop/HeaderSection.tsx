import { Breadcrumb } from "@/components";

export const HeaderSection: React.FC = () => {
  return (
    <section
      className="w-full text-secondary bg-[#f2f2f2] flex flex-col mx-auto
                py-8 justify-center items-center"
    >
      {/* header name */}
      <div className={`text-primary text-4xl font-bold mb-3`}>Products</div>

      {/* breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "home", href: "/" },
          { name: "products", href: "products" },
        ]}
      />
    </section>
  );
};
