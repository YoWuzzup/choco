"use client";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";

import { POSTUpdateUser, POSTUpdateUserAvatar } from "@/api/user";

import { Button, Input, ProfileMenu, Spinner } from "@/components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Settings() {
  const userRedux = useAppSelector((st) => st.user);
  const [user, saveUser] = useReduxAndLocalStorage("user");
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const [errorPasswords, setErrorPasswords] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (acceptedFiles: File[]) => {
    setErrorImage(false);
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // set errors and loading state
    setLoading(true);
    setErrorImage(false);
    setErrorPasswords(null);
    setErrorEmail(null);

    // check if user logged in
    if (!userRedux) return setLoading(false);

    // get only existing key-values
    const nonEmptyValues = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value)
    );

    // check passwords
    if (nonEmptyValues.password && nonEmptyValues.confirmPassword) {
      const matchedPasswords = formData.password === formData.confirmPassword;
      if (!matchedPasswords) {
        setErrorPasswords("Passwords didn't match");
        setLoading(false);
        return;
      }
    }
    // check email
    if (nonEmptyValues.email) {
      const matchedEmail = formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!matchedEmail) {
        setErrorEmail("Email is not correct");
        setLoading(false);
        return;
      }
    }

    // getting only existing key/values
    const { confirmPassword, ...dataToSend } = nonEmptyValues;

    if (image) {
      // if more then 2MB return
      if (image.size > 2 * 1024 * 1024) {
        setErrorImage(true);
        setLoading(false);
        return;
      }

      const fData = new FormData();
      fData.append("avatar", image);
      const r = await POSTUpdateUserAvatar(userRedux?._id, fData);

      // save updated user info
      saveUser(r, userUpdate);
    }

    const data = await POSTUpdateUser(
      userRedux?._id,
      { ...dataToSend },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    // save updated user info
    saveUser(data, userUpdate);
    setLoading(false);
  };

  useEffect(
    () => () => {
      if (image) {
        URL.revokeObjectURL(image as any);
      }
    },
    [image]
  );

  return (
    <div className="h-screen flex flex-row gap-2 flex-nowrap items-start justify-end pt-[4rem]">
      <ProfileMenu />

      <div className="w-full sm:w-9/12 px-3">
        <div className="w-full px-3 mt-20 sm:mt-8">
          <h4 className="font-bold">Change your information</h4>

          {/* name, avatar and email */}
          <div
            className={`w-full p-2 py-7 sm:p-14 my-8 flex flex-row flex-wrap md:flex-nowrap 
                  gap-8 
                  items-center justify-between shadow-lg rounded-md`}
          >
            <Dropzone
              onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={`cursor-pointer w-2/6`}>
                  <input {...getInputProps()} />
                  {image || userRedux?.avatar ? (
                    <>
                      <img
                        alt={image?.name || userRedux?.name}
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : typeof userRedux?.avatar === "string"
                            ? userRedux.avatar
                            : `data:${userRedux?.avatar.mimetype};base64,${userRedux?.avatar.buffer}`
                        }
                        className="max-w-full max-h-full w-auto h-auto block"
                      />
                      {errorImage ? (
                        <p className="text-red mt-4">Too large, max is 2MB</p>
                      ) : null}
                    </>
                  ) : (
                    <p className="max-h-full w-auto h-full ">
                      Drag 'n' drop your avatar here, or click to select files
                    </p>
                  )}
                </div>
              )}
            </Dropzone>

            <div className="flex flex-col gap-3 w-full md:w-5/12">
              <Input
                handleChange={handleChange}
                classNameContainer="flex flex-col relative"
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
                label={{
                  htmlFor: "name",
                  children: <>Name</>,
                  className: "capitalize mb-4 text-sm text-paraPrimary",
                }}
              />
              <Input
                handleChange={handleChange}
                classNameContainer="flex flex-col relative"
                input={{
                  name: "email",
                  id: "email",
                  value: formData.email,
                  autoComplete: "email",
                  placeholder: userRedux?.email || "Email",
                  type: "text",
                  className: `border rounded-lg p-3 text-paraPrimary
                  ${errorEmail ? "border-red" : "border-grey"}`,
                }}
                label={{
                  htmlFor: "email",
                  children: <>email</>,
                  className: "capitalize mb-4 text-sm text-paraPrimary",
                }}
              />
            </div>
          </div>

          {/* passwords */}
          <div
            className={`w-full p-2 py-7 sm:p-14 my-8 flex flex-row flex-wrap gap-4
                  items-center shadow-lg rounded-md justify-between`}
          >
            <h4 className="capitalize basis-full">change password</h4>
            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "password",
                id: "password",
                value: formData.password,
                autoComplete: "password",
                placeholder: "Password",
                type: showPasswords ? "text" : "password",
                className: `border rounded-lg p-3 text-paraPrimary
                ${errorPasswords ? "border-red" : "border-grey"}`,
              }}
              label={{
                htmlFor: "password",
                children: <>password</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            >
              {showPasswords ? (
                <VisibilityOffIcon
                  className="absolute bottom-4 right-3 cursor-pointer text-paraPrimary"
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              ) : (
                <VisibilityIcon
                  className="absolute bottom-4 right-3 cursor-pointer text-paraPrimary"
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              )}
            </Input>
            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "confirmPassword",
                id: "confirmPassword",
                value: formData.confirmPassword,
                autoComplete: "password",
                placeholder: "Confirm Password",
                type: showPasswords ? "text" : "password",
                className: `border rounded-lg p-3 text-paraPrimary
                ${errorPasswords ? "border-red" : "border-grey"}`,
              }}
              label={{
                htmlFor: "confirmPassword",
                children: <>confirm password</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            >
              {showPasswords ? (
                <VisibilityOffIcon
                  className="absolute bottom-4 right-3 cursor-pointer text-paraPrimary"
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              ) : (
                <VisibilityIcon
                  className="absolute bottom-4 right-3 cursor-pointer text-paraPrimary"
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              )}
            </Input>
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
