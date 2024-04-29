"use client";
import { GETProducts } from "@/api/products";
import { Product, Spinner } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addBestSellerProducts } from "@/redux/slices/productsSlice";
import { currentCurency } from "@/utils/common";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";

export const BestSellerSection: React.FC = () => {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const products = useAppSelector((st) => st.products.bestSellerProducts);
  const selectedCurrency = currentCurency();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await GETProducts({ productsPerPage: 6 });

      dispatch(addBestSellerProducts(res));
    };

    fetchProducts();
  }, []);

  return (
    <section
      className={`w-full flex flex-col text-center justify-center items-center py-14 text-primary bg-primary`}
    >
      <h3 className="mb-5 text-5xl font-bold font-[Quicksand] first-letter:uppercase">
        {t(`pages.home.best seller.header`)}
      </h3>
      <div className="w-3/4 text-gray mb-10 capitalize">
        {t(`pages.home.best seller.description`)}
      </div>

      <div className="w-full px-2 lg:px-8 flex flex-row flex-wrap justify-center items-center gap-6 lg:justify-evenly">
        {products ? (
          products.map((p: any, i: number) => (
            <Product
              key={`${p.name}_${i}`}
              product={p}
              currency={selectedCurrency}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};
