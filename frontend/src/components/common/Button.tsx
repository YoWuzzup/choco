import { ReactNode } from "react";

interface IButton {
  type: "button" | "submit" | "reset" | undefined;
  buttonClasses: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export const Button: React.FC<IButton> = ({
  type,
  buttonClasses,
  children,
  handleClick,
}) => {
  return (
    <button
      type={type}
      className={buttonClasses}
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
