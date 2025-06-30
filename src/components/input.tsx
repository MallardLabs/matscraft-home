import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputStyles = cva(
  "relative transition-all duration-200 z-3 text-sm sm:text-base md:text-lg border-[3px] border-border-primary font-minecraft bg-[rgb(88,88,90)] text-white before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgb(49,50,51)] before:border-t-[8px] before:border-[rgb(36,36,37)] before:z-[-1]"
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  className?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ className, label, id, ...props }) => {
  return (
    <div className="flex flex-col gap-1" style={{ width: props.style?.width }}>
      {label && (
        <label htmlFor={id} className="text-white font-minecraft text-md">
          {label}
        </label>
      )}
      <div className={inputStyles({ className })}>
        <input
          id={id}
          className="outline-none w-full h-full px-4 py-4"
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
