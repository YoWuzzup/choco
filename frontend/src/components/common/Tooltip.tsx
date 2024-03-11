interface ITooltipProps {
  children: React.ReactNode;
  message: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  containerStyles?: string;
  messageStyles?: string;
}

export const Tooltip: React.FC<ITooltipProps> = ({
  children,
  message,
  containerStyles,
  messageStyles,
  onClick,
}) => {
  return (
    <div
      className={
        containerStyles ||
        "group/tooltip relative flex justify-center items-center"
      }
      onClick={onClick}
    >
      {children}
      <span
        className={
          messageStyles ||
          "whitespace-nowrap absolute -top-10 scale-0 transition-all rounded bg-colorful p-2 text-xs text-secondary group-hover/tooltip:scale-100"
        }
      >
        {message}
      </span>
    </div>
  );
};
