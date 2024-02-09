"use client";
import { GETProducts } from "@/api/products";
import { ProfileMenu, Spinner } from "@/components";
import { useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useEffect } from "react";

export default function Bookmarks() {
  const [user, saveUser] = useReduxAndLocalStorage("user");
  const likes = useAppSelector((st) => st.user?.likes);
  const currentLikes = useAppSelector((st) => st.user?.currentLikes);

  useEffect(() => {
    if (!likes) return;

    const fetchLikes = async () => {
      let res = await GETProducts({ _id: likes });
      saveUser({ currentLikes: res }, userUpdate);
    };
    fetchLikes();
  }, [likes]);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-9/12 px-3">
        {likes && !currentLikes ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col p-10">
            {currentLikes?.map((l, i) => {
              return (
                <Link href={`/shop/${l._id}`} key={`${l.name}_${i}`}>
                  <div
                    className="w-full px-7 py-14 mb-8 flex flex-row flex-nowrap gap-8 items-center justify-start
                        shadow-lg rounded-md hover:-translate-y-2 duration-200 group"
                  >
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
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
