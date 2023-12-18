"use client";
import Link from "next/link";
import {
  ReactNode,
  ComponentProps,
  ChangeEvent,
  MouseEvent,
  useState,
} from "react";
import { Button, Input } from "..";

type TAuthOverlay = {
  isShown: boolean;
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
  };

  return (
    <div className="flex min-h-1/2 w-full sm:w-7/12 md:w-4/12 flex-col justify-center items-center px-6 pt-12 pb-14 lg:px-8 bg-primary">
      <div className="w-full sm:max-w-sm border-b border-solid border-[#ccc]">
        <Link href={""}>
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
                  <Link href={""}>
                    <div
                      className={`text-colorful outline-none focus:outline-none focus-visible:outline-none
                        `}
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
                focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          handleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handlePageChange(e, "register")
          }
        >
          Don’t have an account?{" "}
          <span className="ml-4 hover:text-colorful">Register now</span>
        </Button>
      </form>
    </div>
  );
};

const Register: React.FC<{
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => void;
}> = ({ handlePageChange }) => {
  return (
    <div className="flex min-h-1/2 w-full sm:w-7/12 md:w-4/12 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-primary">
      <div className="w-full sm:max-w-sm border-b border-solid border-[#ccc]">
        <Link href={""}>
          <img className="mx-auto h-10 mb-5" src="/logo.webp" alt="Choco" />
        </Link>{" "}
      </div>

      <h2 className="mt-10 mb-2 text-center text-lg font-bold leading-9 tracking-tight text-primary">
        Register
      </h2>

      <form className="w-full space-y-6" id="login">
        <>
          <Input
            handleChange={(e: any) => {
              console.log("asd");
            }}
            label={{
              htmlFor: "email",
              className: "block text-sm font-medium leading-6 text-primary",
              children: <>Email address</>,
            }}
            input={{
              id: "email",
              name: "email",
              type: "email",
              autoComplete: "email",
              placeholder: "Email address",
              required: true,
              className: `block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none`,
            }}
          />
        </>

        <div className="flex items-center justify-between">
          <Input
            handleChange={(e: any) => {
              console.log("asd");
            }}
            classNameContainer="w-full"
            label={{
              htmlFor: "password",
              className: "block text-sm font-medium leading-6 text-primary",
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
              className: `block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none`,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <Input
            handleChange={(e: any) => {
              console.log("asd");
            }}
            classNameContainer="w-full"
            label={{
              htmlFor: "confirmPassword",
              className: "block text-sm font-medium leading-6 text-primary",
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
              className: `block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6 outline-none focus:outline-none focus-visible:outline-none`,
            }}
          />
        </div>

        <div>
          <Button
            type={"submit"}
            buttonClasses={`flex w-full h-14 justify-center items-center bg-secondary 
                  text-md font-semibold leading-6 text-secondary shadow-sm 
                  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            handleClick={(e: any) => console.log("asd")}
          >
            Log in
          </Button>

          <Button
            type={"button"}
            buttonClasses={`flex w-full h-14 justify-center items-center bg-[#F2F2F2]
                text-sm font-semibold leading-6 text-primary shadow-sm duration-300 
                focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            handleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handlePageChange(e, "login")
            }
          >
            Already have an account?{" "}
            <span className="ml-4 hover:text-colorful">Login now</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

const Forgot: React.FC<{
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => void;
}> = ({ handlePageChange }) => {
  return <div>asd</div>;
};

export const AuthOverlay: React.FC<TAuthOverlay> = ({ isShown }) => {
  const [page, setPage] = useState<"register" | "login" | "forgot">("login");

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    page: "register" | "login" | "forgot"
  ) => {
    e.preventDefault();

    setPage(page);
  };

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 overflow-auto bg-[#000c] 
      z-50 flex justify-center items-center`}
    >
      {page === "login" ? (
        <Login handlePageChange={handlePageChange} />
      ) : page === "register" ? (
        <Register handlePageChange={handlePageChange} />
      ) : page === "forgot" ? (
        <Forgot handlePageChange={handlePageChange} />
      ) : null}
    </div>
  );
};
