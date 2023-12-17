"use client";
import { Button, Input } from "@/components";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useState } from "react";

export const SubscribeSection: React.FC = () => {
  const [emailValue, setEmailValue] = useState<string>("");

  const handleEmailChange = (e: any) => {
    e.preventDefault();

    setEmailValue(e.target.value);
  };

  return (
    <section className="w-full text-primary bg-[#f2f2f2] flex flex-col justify-around md:flex-row mx-auto px-2 py-28 lg:px-8">
      <div className={`pb-4 md:pb-0 flex flex-col items-center sm:items-start`}>
        <h3 className={`text-3xl font-bold`}>GET UPDATE</h3>
        <p className="text-paraPrimary text-center sm:text-left">
          Subscribe our newsletter and get discount 30% off
        </p>
      </div>
      <div className={`basis-5/12 flex items-center justify-center`}>
        <Input
          label={{
            labelContent: "Enter your email...",
            htmlfor: "subscribeEmail",
          }}
          input={{
            type: "subscribeEmail",
            id: "subscribeEmail",
            name: "subscribeEmail",
            placeholder: "Enter your email...",
            required: true,
            value: emailValue,
            handleChange: handleEmailChange,
          }}
        >
          <Button
            type={"submit"}
            buttonClasses={`absolute right-0 top-0 w-12 h-full bg-colorful outline-none text-secondary 
                duration-300 border border-solid border-colorfulColor
                focus:outline-none focus-visible:outline-none
                hover:bg-primary hover:text-colorful`}
            handleClick={(e: any) => {
              console.log("sad");
            }}
            form={"subscribeEmail"}
          >
            <TelegramIcon fontSize="large" />
          </Button>
        </Input>
      </div>
    </section>
  );
};
