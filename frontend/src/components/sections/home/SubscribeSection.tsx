import { Input } from "@/components";

export const SubscribeSection: React.FC = () => {
  return (
    <section className="w-full text-primary bg-[#f2f2f2] flex flex-col justify-around sm:flex-row mx-auto px-2 py-28 lg:px-8">
      <div className={`pb-4 sm:pb-0 flex flex-col items-center sm:items-start`}>
        <h3 className={`text-3xl font-bold`}>GET UPDATE</h3>
        <p className="text-paraPrimary">
          Subscribe our newsletter and get discount 30% off
        </p>
      </div>
      <div className={`basis-5/12 flex items-center justify-center`}>
        <Input
          classNameContainer={`relative w-full`}
          input={{
            className:
              "w-full h-5 p-6 bg-primary text-paraPrimary capitalize outline-none focus:outline-none focus-visible:outline-none text-primary",
            type: "email",
            id: "email",
            name: "email",
            placeholder: "enter your email...",
            required: true,
          }}
          label={{
            className: "sr-only",
            labelContent: "enter your email...",
            htmlfor: "email",
          }}
        >
          <div className="">sad</div>
        </Input>
      </div>
    </section>
  );
};
