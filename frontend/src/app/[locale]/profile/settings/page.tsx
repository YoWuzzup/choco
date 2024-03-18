"use client";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { userUpdate } from "@/redux/slices/userSlice";

import { POSTUpdateUser, POSTUpdateUserAvatar } from "@/api/user";

import { Button, Input, ProfileMenu, Spinner } from "@/components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useLocalStorage from "@/hooks/useLocalStorage";

type User = null | {
  _id: string;
  avatar: File | {};
  likes: string[];
  name: string;
  email: string;
  cart: [] | string[];
  orders: [] | string[];
};

export default function Settings() {
  // redux
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((st) => st.user);
  // local storage
  const [userLocal, saveUserLocal] = useLocalStorage<User>("user", null);
  const [userAvatar, saveUserAvatar] = useLocalStorage("userAvatar", null);
  const [storedAccessToken, saveAccessTokenToReduxAndLocalStorage] =
    useReduxAndLocalStorage("access_token");
  // different states
  const [loading, setLoading] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const [errorPasswords, setErrorPasswords] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorAddress, setErrorAddress] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    contacts: {
      lineOne: string;
      lineTwo: string;
      city: string;
      zip: string;
      phoneNumber: string;
    };
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contacts: { lineOne: "", lineTwo: "", city: "", zip: "", phoneNumber: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("contacts.")) {
      const contactsField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contacts: {
          ...prev.contacts,
          [contactsField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    setErrorAddress(null);

    // check if user logged in
    if (!userRedux) return setLoading(false);

    // get only existing key-values
    const nonEmptyValues = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value)
    );

    // Check if any field in contacts exists while others don't
    const contactsExist = Object.values(formData.contacts).some((val) => val);
    const allContactsExist = Object.values(formData.contacts).every(
      (val) => val
    );

    if (contactsExist && !allContactsExist) {
      setLoading(false);
      return setErrorAddress("Please complete other address fields");
    }

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

    // Filter out empty values from the contacts object
    const filteredContacts = Object.fromEntries(
      Object.entries(nonEmptyValues.contacts).filter(([key, value]) => value)
    );

    // Construct the dataToSend object with filtered contacts
    const { confirmPassword, ...dataToSend } = nonEmptyValues;
    const dataToSendWithFilteredContacts = {
      ...dataToSend,
      contacts: filteredContacts,
    };

    if (image) {
      // if more then 2MB return
      if (image.size > 2 * 1024 * 1024) {
        setErrorImage(true);
        setLoading(false);
        return;
      }

      const fData = new FormData();
      fData.append("avatar", image);
      const savedAvatar = await POSTUpdateUserAvatar(userRedux?._id, fData);

      // save whole image to local storage and redux
      saveUserAvatar(savedAvatar);
      dispatch(
        userUpdate({
          avatar: savedAvatar,
        })
      );
    }

    const data = await POSTUpdateUser(
      userRedux?._id,
      { ...dataToSendWithFilteredContacts },
      storedAccessToken as string,
      saveAccessTokenToReduxAndLocalStorage
    );

    // save updated user info
    saveUserLocal({ ...(userLocal || userRedux || {}), ...data });
    dispatch(userUpdate(data));
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
        <div className="w-full px-3 mt-24 sm:mt-8">
          <h4 className="font-bold">Change your information</h4>

          {/* name, avatar and email */}
          <div
            className={`w-full p-2 py-7 sm:p-14 my-8 flex flex-row flex-wrap md:flex-nowrap 
                  gap-8 justify-center
                  items-center md:justify-between shadow-lg rounded-md`}
          >
            <Dropzone
              onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`cursor-pointer w-[200px] h-[200px]`}
                >
                  <input {...getInputProps()} />
                  {image || userRedux?.avatar ? (
                    <>
                      <img
                        alt={image?.name || userRedux?.name}
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : userRedux?.avatar instanceof File
                            ? URL.createObjectURL(userRedux?.avatar)
                            : typeof userRedux?.avatar === "object"
                            ? `data:${userRedux?.avatar.mimetype};base64,${userRedux?.avatar.buffer}`
                            : `${userRedux?.avatar}`
                        }
                        className="object-cover w-full h-full rounded-full"
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

          {/* contact info */}
          <div
            className={`w-full p-2 py-7 sm:p-14 my-8 flex flex-row flex-wrap gap-4
                  items-center shadow-lg rounded-md justify-between`}
          >
            <h4 className="capitalize basis-full">
              Contact and shipping information
            </h4>
            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "contacts.lineOne",
                id: "contacts.lineOne",
                value: formData.contacts.lineOne,
                autoComplete: "address-line1",
                placeholder: userRedux?.contacts.lineOne || "address line one",
                type: "text",
                className: `border rounded-lg p-3 text-paraPrimary
                    ${errorAddress ? "border-red" : "border-grey"}`,
              }}
              label={{
                htmlFor: "contacts.lineOne",
                children: <>Address line one</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            />

            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "contacts.lineTwo",
                id: "contacts.lineTwo",
                value: formData.contacts.lineTwo,
                autoComplete: "address-line2",
                placeholder: userRedux?.contacts.lineTwo || "address line two",
                type: "text",
                className: `border rounded-lg p-3 text-paraPrimary`,
              }}
              label={{
                htmlFor: "contacts.lineTwo",
                children: <>Address line two</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            />

            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "contacts.city",
                id: "contacts.city",
                value: formData.contacts.city,
                autoComplete: "home city",
                placeholder: userRedux?.contacts.city || "city",
                type: "text",
                className: `border rounded-lg p-3 text-paraPrimary ${
                  errorAddress ? "border-red" : "border-grey"
                }`,
              }}
              label={{
                htmlFor: "contacts.city",
                children: <>city</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            />

            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "contacts.zip",
                id: "contacts.zip",
                value: formData.contacts.zip,
                autoComplete: "postal-code",
                placeholder: userRedux?.contacts.zip || "zip/postal code",
                type: "text",
                className: `border rounded-lg p-3 text-paraPrimary ${
                  errorAddress ? "border-red" : "border-grey"
                }`,
              }}
              label={{
                htmlFor: "contacts.zip",
                children: <>zip</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            />

            <Input
              handleChange={handleChange}
              classNameContainer="flex flex-col relative w-full md:w-5/12"
              input={{
                name: "contacts.phoneNumber",
                id: "contacts.phoneNumber",
                value: formData.contacts.phoneNumber,
                autoComplete: "tel",
                placeholder: userRedux?.contacts.phoneNumber || "phone number",
                type: "text",
                className: `border rounded-lg p-3 text-paraPrimary ${
                  errorAddress ? "border-red" : "border-grey"
                }`,
              }}
              label={{
                htmlFor: "contacts.phoneNumber",
                children: <>phone number</>,
                className: "capitalize mb-4 text-sm text-paraPrimary",
              }}
            />
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
