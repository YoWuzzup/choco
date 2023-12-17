import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

type TInput = {
  classNameContainer?: string;
  label?: LabelHTMLAttributes<HTMLLabelElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<TInput> = ({
  children,
  classNameContainer,
  label,
  handleChange,
  input,
}) => {
  return (
    <div className={classNameContainer || `relative w-full h-12`}>
      {label ? (
        <label htmlFor={label.htmlFor} className={label.className || "sr-only"}>
          {label.children}
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
        onChange={handleChange}
        {...input}
      />
      {children}
    </div>
  );
};
