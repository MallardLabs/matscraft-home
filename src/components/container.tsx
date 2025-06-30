import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-secondary border-y-[3px] border-b-[rgb(51,51,52)] border-t-[rgb(92,93,94)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
