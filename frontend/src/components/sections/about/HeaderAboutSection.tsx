import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components";

export const HeaderAboutSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section
      className="w-full text-secondary bg-[#f2f2f2] flex flex-col mx-auto
                py-32 mt-[4rem] justify-center items-center"
    >
      {/* header name */}
      <div className={`text-primary text-4xl font-bold mb-3 capitalize`}>
        {t("pages.about.header")}
      </div>

      {/* breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: t("links.home"), href: "/" },
          { name: t("links.about us"), href: "about" },
        ]}
      />
    </section>
  );
};
