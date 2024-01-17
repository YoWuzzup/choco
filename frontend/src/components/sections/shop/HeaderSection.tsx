import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components";

export const HeaderSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section
      className="w-full text-secondary bg-[#f2f2f2] flex flex-col mx-auto
                py-8 justify-center items-center"
    >
      {/* header name */}
      <div className={`text-primary text-4xl font-bold mb-3 capitalize`}>
        {t("pages.shop.header")}
      </div>

      {/* breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: t("links.home"), href: "/" },
          { name: t("links.products"), href: "products" },
        ]}
      />
    </section>
  );
};
