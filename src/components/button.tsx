import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import generateColorPalette from "#/utils/genColors";

const buttonStyles = cva(
  clsx(
    "relative px-3 py-3 border-[3px] border-border-primary z-10",
    "transition-[top,background-color] duration-75 active:top-[6px]",
    "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-[5px] before:z-[-1]",
    "active:before:bottom-0 before:transition-[bottom] before:duration-75 "
  ),
  {
    variants: {
      variant: {
        standard:
          "bg-[rgb(88,88,90)] text-black before:bg-[rgb(198,198,198)] before:border-[3px] before:border-[rgb(236,237,239)] hover:before:bg-[rgb(162,162,162)] hover:before:border-[rgb(241,242,244)]",
        primary:
          "bg-[rgb(49,50,51)] text-white before:bg-[rgb(72,73,74)] before:border-[3px] before:border-[rgb(109,109,110)] hover:before:bg-[rgb(52,53,54)] hover:before:border-[rgb(72,73,74)]",
        success:
          "bg-[rgb(29,77,19)] text-white before:bg-[rgb(60,133,39)] before:border-[3px] before:border-[rgb(99,157,82)] hover:before:bg-[rgb(45,99,38)] hover:before:border-[rgb(126,160,120)]",
        danger:
          "bg-[rgb(173,29,29)] text-white before:bg-[rgb(202,54,54)] before:border-[3px] before:border-[rgb(213,94,94)] hover:before:bg-[rgb(193,59,50)] hover:before:border-[rgb(224,151,149)]",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  custom?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  custom,
  style,
  ...props
}) => {
  if (custom) {
    const palette = generateColorPalette(custom);
    const textColor = `text-${palette.textColor}`;

    const customStyle: React.CSSProperties = {
      backgroundColor: palette.bg,
      ...style,
      "--custom-base-bg": palette.base,
      "--custom-border": palette.border,
      "--custom-hover-bg": palette.hoverBg,
      "--custom-hover-border": palette.hoverBorder,
    } as React.CSSProperties;

    const baseClasses = clsx(
      "btn-custom",
      "relative px-4 py-2 border-[3px] border-border-primary z-10",
      "transition-[top,background-color] duration-75 active:top-[6px]",
      "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-[5px] before:z-[-1]",
      "active:before:bottom-0 before:transition-[bottom] before:duration-75",
      textColor,
      className
    );

    return (
      <button className={baseClasses} style={customStyle} {...props}>
        <style>{`
          .btn-custom::before {
            background-color: var(--custom-base-bg) !important;
            border: 3px solid var(--custom-border) !important;
            transition: all 0.075s !important;
          }
          .btn-custom:hover::before {
            background-color: var(--custom-hover-bg) !important;
            border-color: var(--custom-hover-border) !important;
          }
        `}</style>
        {children}
      </button>
    );
  }

  return (
    <button
      className={clsx(buttonStyles({ variant, className }))}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
