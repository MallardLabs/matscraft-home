import { ReactNode } from "react";
import type { Metadata } from "next";

import "../globals.css";
import Navbar from "#/components/navbar";

export const metadata: Metadata = {
  title: "MatsCraft Wiki",
  description: "Wiki for MatsCraft",
};
interface WikiLayoutProps {
  children: ReactNode;
}

export default function WikiLayout({ children }: WikiLayoutProps) {
  return (
    <div className="min-h-screen dirtBg ">
      <div className="container mx-auto p-0 md:px-4 md:py-3">
        <div className="w-full md:max-w-[1000px] mx-auto border-[3px] border-border-primary">
          <Navbar className="bg-[rgb(246,249,250)] h-14 border-b-[3px] border-border-primary text-border-primary flex items-center justify-center">
            <h1 className="font-ten text-base md:text-2xl">Matscraft Wiki</h1>
          </Navbar>
          <div className="prose prose-lg max-w-none p-3 bg-[rgb(49,50,51)] border-[2px] border-[rgb(85,85,85)]">
            <div className="border-[3px] border-border-primary overflow-y-scroll h-screen md:max-h-[calc(100vh-200px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
