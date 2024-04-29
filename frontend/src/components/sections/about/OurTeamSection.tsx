import { useTranslations } from "next-intl";

const team = [
  {
    name: "Kateryna Melnyk",
    img: { src: "/about/portrait.jpg", alt: "portrait" },
    position: "conditer",
  },
];

export const OurTeamSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section
      className={`flex flex-col text-center justify-center items-center py-14 text-primary bg-primary`}
    >
      <h3 className="mb-8 text-4xl font-normal font-[Quicksand] first-letter:uppercase">
        {t("pages.about.our team")}
      </h3>
      <div className="w-4/5 mb-16 first-letter:uppercase">
        {t("pages.about.description")}
      </div>
      <div className="w-4/5 flex flex-col flex-wrap sm:flex-row justify-center items-center gap-6">
        {team.map((t, i) => (
          <div key={`${t.name}_$${i}`} className="flex flex-col items-center">
            <div className="overflow-hidden mb-5">
              <img
                className="object-cover h-64 transform duration-500 hover:scale-110 hover:grayscale"
                src={t.img.src}
                alt={t.img.alt}
              />
            </div>
            <div className="uppercase font-semibold text-sm mb-3">{t.name}</div>
            <div className="capitalize font-normal text-sm">{t.position}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
