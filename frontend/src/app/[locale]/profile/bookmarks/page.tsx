"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GETProducts } from "@/api/products";
import { POSTUpdateUser } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";
import { renewUserBookmarks } from "@/redux/slices/userBookmarksSlice";

import { Button, ProfileMenu, Spinner } from "@/components";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Bookmarks() {
  const dispatch = useAppDispatch();
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [storedUserBookmarks, saveUserBookmarksToReduxAndLocalStorage] =
    useReduxAndLocalStorage("userBookmarks");
  const user = useAppSelector((st) => st.user);
  const likes = useAppSelector((st) => st.user?.likes);
  const userBookmarks = useAppSelector((st) => st.userBookmarks);
  const [loading, setLoading] = useState<boolean>(true);

  const handleRemoveLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    bId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!bId || !user) return;
    const filteredLikes = user.likes.filter((id: string) => id !== bId);

    const data = await POSTUpdateUser(
      user._id,
      {
        likes: filteredLikes,
      },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    dispatch(userUpdate(data));
    setLoading(false);
  };

  useEffect(() => {
    if (!likes || likes.length === 0) return setLoading(false);

    const fetchLikes = async () => {
      try {
        let res = await GETProducts({ _id: likes });
        saveUserBookmarksToReduxAndLocalStorage(res, renewUserBookmarks);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();

    setLoading(false);
  }, [likes]);

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-center sm:justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-full sm:w-9/12 px-3 mt-24 sm:mt-0">
        {loading ? (
          <div className="mt-28">
            <Spinner />
          </div>
        ) : !likes || likes.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            There's no items in your bookmarks yet.
          </div>
        ) : (
          <div className="flex flex-col p-2 sm:p-10">
            {userBookmarks?.map((b, i) => {
              return (
                <Link
                  href={`/shop/${b._id}`}
                  key={`${b.name}_${i}`}
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
                        {b.name}
                      </div>
                      <div className="text-paraPrimary">{b.description}</div>
                    </div>

                    <Button
                      type={"button"}
                      buttonClasses={`group/button p-2 border border-red bg-primary rounded-full duration-300 
                        hover:bg-red`}
                      handleClick={(e) => handleRemoveLike(e, b._id)}
                    >
                      <DeleteIcon className="text-red group-hover/button:text-secondary" />
                    </Button>
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
