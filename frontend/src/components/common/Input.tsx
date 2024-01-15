import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

type TInput = {
  classNameContainer?: string;
  label?: LabelHTMLAttributes<HTMLLabelElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<TInput> = ({
  children,
  classNameContainer,
  label,
  handleChange,
  input,
}) => {
  return (
    <div className={classNameContainer}>
      {label ? (
        <label
          htmlFor={label.htmlFor}
          className={label.className || "sr-only"}
          {...label}
        >
          {label.children}
        </label>
      ) : null}

      <input
        className={
          input?.className ||
          "w-full h-full p-6 pr-16 bg-primary text-paraPrimary outline-none focus:outline-none focus-visible:outline-none"
        }
        onChange={handleChange}
        {...input}
      />
      {children}
    </div>
  );
};
