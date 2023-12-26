"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Input } from "..";
import { POSTLoginData, POSTRegister } from "@/api/authentication";
import { useReduxAndLocalStorage } from "@/hooks/useReduxAndLocalStorage ";
import { saveAccessTokenToRedux } from "@/redux/slices/accessTokenSlice";
import { userRegister } from "@/redux/slices/userSlice";

type TAuthOverlay = {
  setShowAuthOverlay: (e: any) => void;
};

const Login: React.FC<{
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => void;
}> = ({ handlePageChange }) => {
  const [emailIsValid, setEmailValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordValid] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleLoginChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValid(true);
    setPasswordValid(true);

    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (loginData.email.trim() === "" || !emailRegex.test(loginData.email)) {
      // Handle invalid data
      setEmailValid(false);
      return;
    }

    // Check if password is valid
    if (loginData.password.trim() === "") {
      // Handle invalid password format
      setPasswordValid(false);
      return;
    }

    // TODO: login logic
    POSTLoginData(loginData);
  };

  return (
    <>
      <div className="w-full sm:max-w-sm border-b border-solid border-[#ccc]">
        <Link
          href={""}
          className="outline-none focus:outline-none focus-visible:outline-none"
        >
          <img className="mx-auto h-10 mb-5" src="/logo.webp" alt="Choco" />
        </Link>{" "}
      </div>

      <h2 className="mt-10 mb-2 text-center text-lg font-bold leading-9 tracking-tight text-primary">
        Sign in to your account
      </h2>

      <form className="w-full space-y-7" id="login" noValidate>
        <Input
          handleChange={handleLoginChange}
          label={{
            htmlFor: "email",
            className: `block text-sm font-medium leading-6 ${
              emailIsValid ? "text-primary" : "text-red"
            }`,
            children: <>Email address</>,
          }}
          input={{
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            className: `block w-full py-1.5 px-2 shadow-sm placeholder:text-gray
                border border-solid ${
                  emailIsValid ? "border-gray" : "border-red"
                }
                sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none`,
          }}
        />

        <div className="flex items-center justify-between w-full">
          <Input
            handleChange={handleLoginChange}
            classNameContainer="w-full"
            label={{
              htmlFor: "password",
              className: `block text-sm font-medium leading-6 ${
                passwordIsValid ? "text-primary" : "text-red"
              }`,
              children: (
                <div className="flex flex-row flex-nowrap justify-between">
                  Password{" "}
                  <Link
                    href={""}
                    className="outline-none focus:outline-none focus-visible:outline-none"
                  >
                    <div
                      className={`text-colorful`}
                      onClick={(e: any) => handlePageChange(e, "forgot")}
                    >
                      Forgot password?
                    </div>
                  </Link>
                </div>
              ),
            }}
            input={{
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "password",
              required: true,
              className: `block w-full py-1.5 px-2 shadow-sm placeholder:text-gray
                border border-solid ${
                  passwordIsValid ? "border-gray" : "border-red"
                }
                sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none`,
            }}
          />
        </div>

        <Button
          type={"submit"}
          buttonClasses={`flex w-full h-14 justify-center items-center bg-secondary
                text-md font-semibold leading-6 text-secondary shadow-sm duration-300 
                hover:bg-colorful outline-none focus:outline-none focus-visible:outline-none`}
          handleClick={handleLoginSubmit}
        >
          Log in
        </Button>

        <Button
          type={"button"}
          buttonClasses={`flex w-full h-14 justify-center items-center bg-[#F2F2F2]
                text-sm font-semibold leading-6 text-primary shadow-sm duration-300
                outline-none focus:outline-none focus-visible:outline-none`}
          handleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handlePageChange(e, "register")
          }
        >
          Don’t have an account?{" "}
          <span className="ml-4 hover:text-colorful">Register now</span>
        </Button>
      </form>
    </>
  );
};

const Register: React.FC<{
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => void;
}> = ({ handlePageChange }) => {
  const [storedAccessToken, saveAccessToken] =
    useReduxAndLocalStorage("access_token");
  const [storedUser, saveUser] = useReduxAndLocalStorage("user");
  const [errorOnRegister, setErrorOnRegister] = useState<false | Error>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(true);
  const [registerData, setRegisterData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({ email: "", password: "", confirmPassword: "" });

  const handleRegisterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailIsValid(true);
    setPasswordIsValid(true);
    setConfirmPasswordIsValid(true);
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (
      registerData.email.trim() === "" ||
      !emailRegex.test(registerData.email)
    ) {
      setEmailIsValid(false);
      return;
    }

    // Check if passwords are valid
    if (
      registerData.password.trim() === "" ||
      registerData.password !== registerData.confirmPassword
    ) {
      setPasswordIsValid(false);
      setConfirmPasswordIsValid(false);
      return;
    }

    // if everything is ok send the request to register a new user
    try {
      const res = await POSTRegister(registerData);
      const { access_token, userData } = res;

      saveAccessToken(access_token, saveAccessTokenToRedux);
      saveUser(userData, userRegister);
    } catch (error: any) {
      setErrorOnRegister(error.response.data as Error);
    }
  };

  return (
    <>
      <div className="w-full sm:max-w-sm border-b border-solid border-[#ccc]">
        <Link
          href={""}
          className="outline-none focus:outline-none focus-visible:outline-none"
        >
          <img className="mx-auto h-10 mb-5" src="/logo.webp" alt="Choco" />
        </Link>{" "}
      </div>

      <h2 className="mt-10 mb-2 text-center text-lg font-bold leading-9 tracking-tight text-primary">
        Register
      </h2>

      <form className="w-full space-y-6" id="login" noValidate>
        <Input
          handleChange={handleRegisterChange}
          label={{
            htmlFor: "email",
            className: `block text-sm font-medium leading-6 text-primary
            ${emailIsValid ? "text-primary" : "text-red"}`,
            children: <>Email address</>,
          }}
          input={{
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            placeholder: "Email address",
            required: true,
            className: `block w-full py-1.5 px-2 text-gray
                  shadow-sm placeholder:text-gray border border-solid
                  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none
                  ${emailIsValid ? "border-gray" : "border-red"}`,
          }}
        />

        <div className="flex items-center justify-between">
          <Input
            handleChange={handleRegisterChange}
            classNameContainer="w-full"
            label={{
              htmlFor: "password",
              className: `block text-sm font-medium leading-6
              ${
                passwordIsValid || confirmPasswordIsValid
                  ? "text-gray"
                  : "text-red"
              }`,
              children: (
                <div className="flex flex-row flex-nowrap justify-between">
                  Password
                </div>
              ),
            }}
            input={{
              id: "password",
              name: "password",
              type: "password",
              placeholder: "Password",
              autoComplete: "password",
              required: true,
              className: `block w-full py-1.5 px-2 text-gray shadow-sm placeholder:text-gray border border-solid 
                        sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none
                        ${
                          passwordIsValid || confirmPasswordIsValid
                            ? "border-gray"
                            : "border-red"
                        }`,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <Input
            handleChange={handleRegisterChange}
            classNameContainer="w-full"
            label={{
              htmlFor: "confirmPassword",
              className: `block text-sm font-medium leading-6
              ${
                passwordIsValid || confirmPasswordIsValid
                  ? "text-gray"
                  : "text-red"
              }`,
              children: (
                <div className="flex flex-row flex-nowrap justify-between">
                  Confirm password
                </div>
              ),
            }}
            input={{
              id: "confirmPassword",
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirm password",
              required: true,
              className: `block w-full py-1.5 px-2 text-gray shadow-sm border border-solid
              placeholder:text-gray sm:text-sm sm:leading-6 
              outline-none focus:outline-none focus-visible:outline-none
              ${
                passwordIsValid || confirmPasswordIsValid
                  ? "border-gray"
                  : "border-red"
              }
                `,
            }}
          />
        </div>
        {errorOnRegister ? (
          <div
            className={`block w-full py-1.5 px-2 text-red shadow-sm border border-solid
                  border-red`}
          >
            {errorOnRegister.message ||
              "Something went wrong, try a bit later..."}
          </div>
        ) : null}

        <div>
          <Button
            type={"submit"}
            buttonClasses={`flex w-full h-14 mb-5 justify-center items-center bg-secondary 
                  text-md font-semibold leading-6 text-secondary shadow-sm 
                  outline-none focus:outline-none focus-visible:outline-none`}
            handleClick={handleRegisterSubmit}
          >
            Register
          </Button>

          <Button
            type={"button"}
            buttonClasses={`flex flex-col sm:flex-row w-full sm:h-14 justify-center items-center bg-[#F2F2F2]
                text-sm font-semibold leading-6 text-primary shadow-sm duration-300 
                outline-none focus:outline-none focus-visible:outline-none`}
            handleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handlePageChange(e, "login")
            }
          >
            Already have an account?{" "}
            <span className="sm:ml-4 hover:text-colorful">Login now</span>
          </Button>
        </div>
      </form>
    </>
  );
};

const Forgot: React.FC<{
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => void;
}> = ({ handlePageChange }) => {
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);

  const [data, setData] = useState<{
    email: string;
  }>({ email: "" });

  const handleRegisterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailIsValid(true);

    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (data.email.trim() === "" || !emailRegex.test(data.email)) {
      setEmailIsValid(false);
      return;
    }

    // TODO: register logic
    console.log("asd");
  };

  return (
    <>
      <div className="w-full sm:max-w-sm border-b border-solid border-[#ccc]">
        <Link
          href={""}
          className="outline-none focus:outline-none focus-visible:outline-none"
        >
          <img className="mx-auto h-10 mb-5" src="/logo.webp" alt="Choco" />
        </Link>{" "}
      </div>

      <h2 className="mt-10 mb-2 text-center text-lg font-bold leading-9 tracking-tight text-primary">
        Reset your password
      </h2>

      <form className="w-full space-y-6" id="login" noValidate>
        <Input
          handleChange={handleRegisterChange}
          label={{
            htmlFor: "email",
            className: `block text-sm font-medium leading-6 text-primary
        ${emailIsValid ? "text-primary" : "text-red"}`,
            children: <>Email address</>,
          }}
          input={{
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            placeholder: "Email address",
            required: true,
            className: `block w-full py-1.5 px-2 text-gray
              shadow-sm placeholder:text-gray border border-solid
              sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none
              ${emailIsValid ? "border-gray" : "border-red"}`,
          }}
        />

        <div>
          <Button
            type={"submit"}
            buttonClasses={`flex w-full h-14 mb-5 justify-center items-center bg-secondary 
              text-md font-semibold leading-6 text-secondary shadow-sm 
              outline-none focus:outline-none focus-visible:outline-none`}
            handleClick={handleDataSubmit}
          >
            Submit
          </Button>

          <Button
            type={"button"}
            buttonClasses={`flex w-full h-14 justify-center items-center bg-[#F2F2F2]
            text-sm font-semibold leading-6 text-primary shadow-sm duration-300 
            outline-none focus:outline-none focus-visible:outline-none`}
            handleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handlePageChange(e, "login")
            }
          >
            Already have an account?{" "}
            <span className="ml-4 hover:text-colorful">Login now</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export const AuthOverlay: React.FC<TAuthOverlay> = ({ setShowAuthOverlay }) => {
  const [page, setPage] = useState<"register" | "login" | "forgot">("login");

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setPage(page);
  };

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 overflow-auto bg-[#000c] 
      z-50 flex justify-center items-center`}
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();

        setShowAuthOverlay(false);
      }}
    >
      <div
        onClick={(e: any) => e.stopPropagation()}
        className="flex min-h-1/2 w-full sm:w-7/12 md:w-4/12 flex-col justify-center items-center px-6 pt-12 pb-14 lg:px-8 bg-primary"
      >
        {page === "login" ? (
          <Login handlePageChange={handlePageChange} />
        ) : page === "register" ? (
          <Register handlePageChange={handlePageChange} />
        ) : page === "forgot" ? (
          <Forgot handlePageChange={handlePageChange} />
        ) : null}
      </div>
    </div>
  );
};
