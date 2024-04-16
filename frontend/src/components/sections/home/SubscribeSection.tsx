"use client";
import { POSTSubscribeToNews } from "@/api/user";
import { Button, Input } from "@/components";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const SubscribeSection: React.FC = () => {
  const t = useTranslations("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [res, setRes] = useState<{
    message: string;
    statusCode: number;
  } | null>(null);
  const [error, setError] = useState<{
    error: string;
    message: string;
    statusCode: number;
  } | null>(null);

  const handleEmailChange = (e: any) => {
    e.preventDefault();

    setEmailValue(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // set state
    setRes(null);
    setError(null);

    await POSTSubscribeToNews(emailValue)
      .then((r) => setRes(r))
      .catch((er) => setError(er));
  };

  return (
    <section className="w-full text-primary bg-[#f2f2f2] flex flex-col justify-between md:flex-row mx-auto px-10 py-28 lg:px-8">
      <div className={`pb-4 md:pb-0 flex flex-col items-center sm:items-start`}>
        <h3 className={`text-3xl font-bold uppercase`}>
          {t(`pages.home.sub.header`)}
        </h3>
        <p className="text-paraPrimary text-center sm:text-left first-letter:uppercase">
          {t(`pages.home.sub.subheader`)}
        </p>
      </div>

      <div className={`basis-5/12 flex flex-col items-start justify-center`}>
        <Input
          classNameContainer="relative w-full h-12"
          label={{
            children: <>"Enter your email..."</>,
            htmlFor: "subscribeEmail",
          }}
          input={{
            type: "subscribeEmail",
            id: "subscribeEmail",
            name: "subscribeEmail",
            placeholder: t(`pages.home.sub.email input`),
            autoComplete: "email",
            required: true,
            value: emailValue,
          }}
          handleChange={handleEmailChange}
        >
          <Button
            type={"submit"}
            buttonClasses={`absolute right-0 top-0 w-12 h-full bg-colorful outline-none text-secondary 
                duration-300 border border-solid border-colorfulColor
                focus:outline-none focus-visible:outline-none
                hover:bg-primary hover:text-colorful`}
            handleClick={handleSubmit}
            form={"subscribeEmail"}
          >
            <TelegramIcon fontSize="large" />
          </Button>
        </Input>

        <>
          {res && <div className="mt-6 text-success">{res.message}</div>}
          {error && <div className="mt-6 text-red">{error.message}</div>}
        </>
      </div>
    </section>
  );
};
