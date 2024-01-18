import { useTranslations } from "next-intl";

// TODO
export const WhyUsSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section
      className={`flex flex-col text-center justify-center items-center py-14 text-primary bg-primary`}
    >
      <h3 className="mb-8 text-4xl font-normal font-[Quicksand] capitalize">
        {t("pages.about.our team")}
      </h3>
      <div className="w-4/5 mb-16">{t("pages.about.description")}</div>
      <div className="w-4/5 flex flex-col flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center gap-6"></div>
    </section>
  );
};
