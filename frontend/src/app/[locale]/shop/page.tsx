import { CollectionSection, HeaderShopSection } from "@/components";

export default function Shop() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HeaderShopSection />
      <CollectionSection />
    </main>
  );
}
