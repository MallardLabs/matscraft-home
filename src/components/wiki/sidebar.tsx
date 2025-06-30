"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface WikiItem {
  slug: string;
  title: string;
  description?: string;
  date?: string;
}

interface WikiSidebarProps {
  wikiItems: WikiItem[];
}

export default function WikiSidebar({ wikiItems }: WikiSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = pathname.replace("/wiki/", "").replace("/wiki", "");

  return (
    <>
      <div className="flex flex-col w-full">
        {wikiItems.map((item) => (
          <Link
            key={item.slug}
            href={`/wiki/${item.slug}`}
            className={`
                    block p-3 text-[13px] border-y-[3px] border-transparent
                    ${
                      currentPath === item.slug
                        ? "bg-[rgb(72,73,74)] text-white border-t-[3px] border-b-[3px] border-b-[rgb(92,93,94)] border-t-[rgb(43,44,44)]"
                        : "text-white hover:bg-[rgb(72,73,74)] hover:border-t-[3px] hover:border-b-[3px] hover:border-b-[rgb(43,44,44)] hover:border-t-[rgb(92,93,94)]"
                    }
                  `}
            onClick={() => setIsOpen(false)}
          >
            <div className="font-medium">{item.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
