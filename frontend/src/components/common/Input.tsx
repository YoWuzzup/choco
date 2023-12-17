import { ComponentProps } from "react";

type TInput = {
  classNameContainer?: string;
  label: {
    className?: string;
    labelContent: string;
    htmlfor: string;
  } | null;
  input?: {
    className?: string;
    type: string;
    id: string;
    name: string;
    placeholder?: string | undefined;
    required: boolean;
    value?: string | number;
    handleChange: (e: any) => void;
  };
} & ComponentProps<"input">;

export const Input: React.FC<TInput> = ({
  children,
  classNameContainer,
  label,
  input,
}) => {
  return (
    <div className={classNameContainer || `relative w-full h-12`}>
      {label ? (
        <label htmlFor={label.htmlfor} className={label.className || "sr-only"}>
          {label.labelContent}
        </label>
      ) : null}

      <input
        type={input?.type}
        id={input?.id}
        name={input?.name}
        className={
          input?.className ||
          "w-full h-full p-6 pr-16 bg-primary text-paraPrimary outline-none focus:outline-none focus-visible:outline-none"
        }
        placeholder={input?.placeholder || ""}
        value={input?.value}
        required={input?.required || false}
        onChange={input?.handleChange}
      />
      {children}
    </div>
  );
};
