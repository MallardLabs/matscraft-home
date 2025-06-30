import React from "react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        `relative z-3 inline-flex h-8 w-16 flex-shrink-0 cursor-pointer border-[3px] border-border-primary transition-colors duration-200 ease-in-out
before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0  before:bg-[rgb(60,133,39)] before:border-[3px] before:border-[rgb(99,157,82)] before:z-[-1]
        `,
        checked
          ? "bg-[rgb(29,77,19)]"
          : "bg-[rgb(88,88,90)] before:bg-[rgb(140,141,144)] before:border-[3px] before:border-[rgb(162,162,162)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span
        className={clsx(
          `relative inline-block h-9 w-9 transform bg-[rgb(88,88,90)] transition duration-200 ease-in-out border-[3px] border-border-primary top-[-7px]
           before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-[5px] before:bg-[rgb(198,198,198)] before:border-[3px] before:border-[rgb(236,237,239)] before:z-[-1]
          `,

          checked ? "translate-x-[24px]" : "translate-x-[-5px]"
        )}
      />
    </button>
  );
};

export default Switch;
