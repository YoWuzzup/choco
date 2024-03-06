"use client";
import { GETProducts } from "@/api/products";
import { Product, Spinner } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addBestSellerProducts } from "@/redux/slices/productsSlice";
import { useEffect } from "react";

export const BestSellerSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((st) => st.products.bestSellerProducts);

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
      <h3 className="mb-5 text-5xl font-bold font-[Quicksand]">Best Seller</h3>
      <div className="w-3/4 text-gray mb-10">
        Best Seller Product This Week!
      </div>

      <div className="w-full px-2 lg:px-8 flex flex-row flex-wrap justify-center items-center gap-6 lg:justify-evenly">
        {products ? (
          products.map((p: any, i: number) => (
            <Product key={`${p.name}_${i}`} product={p} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};
