import React from "react";
import clsx from "clsx";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, className, ...props }) => {
  return (
    <div
      className="bg-[rgb(246,249,250)] h-14 border-b-[3px] border-border-primary text-border-primary"
      {...props}
    >
      <div
        className={clsx(
          "w-full h-full border-b-[5px] border-b-[rgb(177,178,181)] flex items-center",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Navbar;
