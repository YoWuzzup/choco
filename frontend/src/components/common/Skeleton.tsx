type TSkeleton = {
  amountOfDivs?: number;
  width?: string;
  height?: string;
  containerClassName?: string;
};

export const Skeleton: React.FC<TSkeleton> = ({
  amountOfDivs,
  width,
  height,
  containerClassName,
}) => {
  const skeletonDivs = amountOfDivs
    ? Array.from({ length: amountOfDivs })
    : [1];

  return (
    <div
      role="status"
      className={
        containerClassName
          ? containerClassName
          : `w-full animate-pulse flex justify-start items-center`
      }
    >
      {skeletonDivs.map((_, i) => {
        return (
          <div
            key={`${i}`}
            className={`bg-gray rounded-full dark:bg-gray flex items-center justify-start
            ${width ? `w-${width}` : "w-48"}
            ${height ? `h-${height}` : "h-2.5"}`}
          />
        );
      })}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
