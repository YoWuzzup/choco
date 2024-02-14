"use client";
import Link from "next/link";

import { ProfileMenu, Spinner } from "@/components";
import { useAppSelector } from "@/hooks/redux";

export default function Cart() {
  const user = useAppSelector((st) => st.user);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-full sm:w-9/12 px-3 mt-24 sm:mt-0">
        {!user ? (
          <div className="mt-28">
            <Spinner />
          </div>  
        ) : !user.cart || user.cart.length === 0 ? (
          <div>There's no items in your cart yet.</div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {user.cart?.map((l, i) => {
              return (
                <Link
                  href={`/shop/${l._id}`}
                  key={`${l.name}_${i}`}
                  className="w-full px-7 py-14 mb-8 flex flex-row flex-nowrap gap-8 items-center justify-start
                    shadow-lg rounded-md hover:-translate-y-2 duration-200 group"
                >
                  <>
                    {/* TODO: add picture */}
                    <img
                      src={``}
                      alt={`like picture ${i}`}
                      className=""
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex flex-col grow">
                      <div className="text-lg capitalize text-primary group-hover:text-colorful">
                        {l.name}
                      </div>
                      <div className="text-paraPrimary">{l.description}</div>
                    </div>
                  </>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
