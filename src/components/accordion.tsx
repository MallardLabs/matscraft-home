import React, { useState } from "react";
import Button from "./button";
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden shadow-sm">
      <Button
        variant={"primary"}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-secondary transition-colors text-left"
      >
        <span className="font-medium">{title}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </Button>

      <div
        className={`px-4 py-2 transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
