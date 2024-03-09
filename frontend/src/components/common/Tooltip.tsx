interface ITooltipProps {
  children: React.ReactNode;
  message: string;
  containerStyles?: string;
  messageStyles?: string;
}

export const Tooltip: React.FC<ITooltipProps> = ({
  children,
  message,
  containerStyles,
  messageStyles,
}) => {
  return (
    <div
      className={
        containerStyles ||
        "group/tooltip relative flex justify-center items-center"
      }
    >
      {children}
      <span
        className={
          messageStyles ||
          "absolute -top-10 scale-0 transition-all rounded bg-colorful p-2 text-xs text-secondary group-hover/tooltip:scale-100"
        }
      >
        {message}
      </span>
    </div>
  );
};
