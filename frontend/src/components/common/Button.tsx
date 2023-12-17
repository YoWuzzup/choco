import { ReactNode, ComponentProps } from "react";

type TButton = {
  type: "button" | "submit" | "reset" | undefined;
  buttonClasses: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
} & ComponentProps<"button">;

export const Button: React.FC<TButton> = ({
  type,
  buttonClasses,
  children,
  handleClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={buttonClasses}
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
