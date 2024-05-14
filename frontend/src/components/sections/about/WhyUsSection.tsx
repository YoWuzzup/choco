import { useTranslations } from "next-intl";

const reasons = ["first reason", "second reason", "third reason"];

export const WhyUsSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section
      className={`w-full flex flex-col text-center justify-center items-center 
        py-32 text-secondary bg-[url('/about/mochi_bg.webp')] bg-colorful bg-no-repeat bg-right`}
    >
      <h3
        className="relative pb-10 mb-14 text-4xl font-normal font-[Quicksand] first-latter:capitalize
                  after:content-[''] after:absolute after:h-[2px] after:w-16
                  after:bg-colorful after:bottom-0 after:right-1/2 after:translate-x-2/4
                  after:transition-all"
      >
        {t("pages.about.reasons.header")}
      </h3>

      <div className="w-11/12 flex flex-col sm:flex-row flex-nowrap justify-center items-center gap-10 sm:gap-5">
        {reasons.map((r, i) => (
          <div key={`${r}_${i}`}>
            <h4 className="uppercase mb-2 text-2xl">
              {t(`pages.about.reasons.${r}.header`)}
            </h4>
            <div className="text-base">
              {t(`pages.about.reasons.${r}.subheader`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
