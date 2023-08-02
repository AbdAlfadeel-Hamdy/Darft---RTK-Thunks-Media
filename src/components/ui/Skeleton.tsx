import classNames from "classnames";

const Skeleton = ({
  times,
  className,
}: {
  times: number;
  className: string;
}) => {
  const outerBoxClassnames = classNames(
    "relative",
    "bg-gray-200",
    "mb-2.5",
    "rounded",
    "overflow-hidden",
    className
  );
  const innerBoxClassnames = classNames(
    "absolute",
    "-translate-x-full",
    "inset-0 ",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200",
    "animate-shimmer"
  );
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerBoxClassnames}>
        <div className={innerBoxClassnames} />
      </div>
    ));

  return <div>{boxes}</div>;
};

export default Skeleton;
