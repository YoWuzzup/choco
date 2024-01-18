import { HeaderAboutSection, OurTeamSection, WhyUsSection } from "@/components";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between mt-[4rem]">
      <HeaderAboutSection />
      <OurTeamSection />
      <WhyUsSection />
    </main>
  );
}
