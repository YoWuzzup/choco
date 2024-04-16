import { useTranslations } from "next-intl";

export const AboutUsSection: React.FC = () => {
  const t = useTranslations("");

  return (
    <section
      className={`flex flex-col text-center justify-center items-center py-14 text-primary bg-primary`}
    >
      <h3 className="mb-5 text-5xl font-bold font-[Quicksand] capitalize">
        {t("pages.about.header")}
      </h3>
      <div className="w-3/4">{t("pages.about.description")}</div>
    </section>
  );
};
