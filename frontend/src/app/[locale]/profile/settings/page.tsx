"use client";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";

import { POSTUpdateUser } from "@/api/user";

import { Button, Input, ProfileMenu, Spinner } from "@/components";
import { userUpdate } from "@/redux/slices/userSlice";

export default function Settings() {
  const userRedux = useAppSelector((st) => st.user);
  const [user, saveUser] = useReduxAndLocalStorage("user");
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!userRedux) return setLoading(false);

    const data = await POSTUpdateUser(
      userRedux?._id,
      { ...formData },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    saveUser(data, userUpdate);
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-full sm:w-9/12 px-3">
        <div className="w-full px-3 mt-20 sm:mt-8">
          <h4 className="font-bold">Change your information</h4>

          {/* name, avatar and email */}
          <div
            className={`w-full px-7 py-14 my-8 flex flex-row flex-nowrap gap-8 
                  items-center justify-between shadow-lg rounded-md`}
          >
            {/* TODO:change to React drop */}
            <img
              alt={`${userRedux?.name}`}
              src={`${userRedux?.avatar}`}
              className="max-w-full max-h-full w-auto h-auto block"
            />

            <div className="flex flex-col gap-3">
              <Input
                handleChange={handleChange}
                input={{
                  name: "name",
                  id: "name",
                  value: formData.name,
                  autoComplete: "name",
                  placeholder: userRedux?.name || "Name",
                  type: "text",
                  className:
                    "border border-grey rounded-lg p-3 text-paraPrimary",
                }}
                label={{ htmlFor: "name", children: <>Name</> }}
              />
              <Input
                handleChange={handleChange}
                input={{
                  name: "email",
                  id: "email",
                  value: formData.email,
                  autoComplete: "email",
                  placeholder: userRedux?.email || "Email",
                  type: "text",
                  className:
                    "border border-grey rounded-lg p-3 text-paraPrimary",
                }}
                label={{ htmlFor: "email", children: <>email</> }}
              />
            </div>
          </div>

          {/* save button */}
          <div
            className={`w-full px-7 py-14 my-8 flex flex-row flex-nowrap gap-8 
                  items-center justify-between shadow-lg rounded-md`}
          >
            {loading ? (
              <Spinner
                contanerStyles="h-12 w-full flex justify-center items-center"
                svgStyles="w-10 h-10 animate-spin dark:text-gray-600 fill-blue-600"
              />
            ) : (
              <Button
                type={"button"}
                buttonClasses={`text-secondary bg-colorful border-2 rounded-full p-3
              w-full h-12 uppercase transition-all duration-300 ease-in-out
              text-primary flex items-center justify-center
              hover:text-colorful hover:bg-primary`}
                handleClick={(e) => handleSubmit(e)}
              >
                Save changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
