import {
  HeaderAboutSection,
  InstagramSection,
  OurTeamSection,
  WhyUsSection,
} from "@/components";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HeaderAboutSection />
      <OurTeamSection />
      <WhyUsSection />
      <InstagramSection />
    </main>
  );
}
