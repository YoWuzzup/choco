import { InformationAndReview, ProductMainInfoSection } from "@/components";

export default function SingleProduct() {
  return (
    <main className="flex flex-col items-center justify-between">
      <ProductMainInfoSection />
      <InformationAndReview />
    </main>
  );
}
