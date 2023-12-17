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
  };
} & ComponentProps<"input">;

export const Input: React.FC<TInput> = ({
  children,
  classNameContainer,
  label,
  input,
}) => {
  return (
    <div className={classNameContainer || "mb-6 relative"}>
      {label ? (
        <label
          htmlFor={label.htmlfor}
          className={
            label.className ||
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          }
        >
          {label.labelContent}
        </label>
      ) : null}

      <input
        type={input?.type}
        id={input?.id}
        name={input?.name}
        className={
          input?.className ||
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }
        placeholder={input?.placeholder || ""}
        required={input?.required || false}
      />
      {children}
    </div>
  );
};
