"use client";
import { useEffect, useState } from "react";

type OreKey =
  | "common_mats_ore"
  | "uncommon_mats_ore"
  | "rare_mats_ore"
  | "epic_mats_ore"
  | "legendary_mats_ore";

type StatsType = {
  blocks: Partial<Record<OreKey, number>>;
  items: {
    mats?: number;
    huh?: number;
  };
};

function SkeletonValue({ value }: { value?: number }) {
  return typeof value === "number" ? (
    <>{value.toLocaleString()}</>
  ) : (
    <span className="w-16 h-4 bg-gray-300 animate-pulse inline-block rounded opacity-20" />
  );
}

export default function MiningStats() {
  const [stats, setStats] = useState<StatsType | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://play.matscraft.xyz:3000/serverStats");
        const data: StatsType = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch mining stats", err);
      }
    }

    fetchStats();
  }, []);

  const oreList: { key: OreKey; img: string; label: string }[] = [
    { key: "common_mats_ore", img: "common.png", label: "Common Mats Ore" },
    {
      key: "uncommon_mats_ore",
      img: "uncommon.png",
      label: "Uncommon Mats Ore",
    },
    { key: "rare_mats_ore", img: "rare.png", label: "Rare Mats Ore" },
    { key: "epic_mats_ore", img: "epic.png", label: "Epic Mats Ore" },
    {
      key: "legendary_mats_ore",
      img: "legendary.png",
      label: "Legendary Mats Ore",
    },
  ];

  const tokenList = [
    { key: "mats", img: "mats.png", label: "$MATS" },
    { key: "huh", img: "huh.png", label: "$HUH" },
  ] as const;

  return (
    <div className="w-full max-w-[90%] mx-auto flex flex-col md:flex-row gap-10 items-center">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src="/images/stats.jpg"
          alt="Total ores and items mined"
          className="border-4 border-border-primary w-full max-w-[500px]"
        />
      </div>

      {/* Text Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm md:text-base w-full">
        {/* Ores */}
        <div className="space-y-3">
          <h2 className="font-ten text-xl md:text-2xl mb-2">
            Total Ores Mined
          </h2>
          {oreList.map(({ key, img, label }) => (
            <div key={key} className="flex items-center gap-3">
              <img
                src={`/images/ore/${img}`}
                alt={label}
                className="w-8 h-8 object-contain"
              />
              <p>
                {label}: <SkeletonValue value={stats?.blocks?.[key]} />
              </p>
            </div>
          ))}
        </div>

        {/* Tokens */}
        <div className="space-y-3">
          <h2 className="font-ten text-xl md:text-2xl mb-2">
            Total Tokens Mined
          </h2>
          {tokenList.map(({ key, img, label }) => (
            <div key={key} className="flex items-center gap-3">
              <img
                src={`/images/item/${img}`}
                alt={label}
                className="w-8 h-8 object-contain"
              />
              <p>
                {label}: <SkeletonValue value={stats?.items?.[key]} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
