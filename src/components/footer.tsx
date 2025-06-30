"use client";
import { useEffect, useState } from "react";

function SkeletonValue({ value }: { value?: number | null }) {
  return typeof value === "number" ? (
    <>{value.toLocaleString()}</>
  ) : (
    <span className="w-10 h-4 bg-gray-300 animate-pulse inline-block rounded-sm opacity-30" />
  );
}

export default function Footer() {
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(
          "https://api.mcsrvstat.us/bedrock/3/play.matscraft.xyz"
        ); // gunakan proxy endpoint
        const data = await res.json();
        setOnline(data?.players?.online ?? 0);
      } catch (err) {
        console.error("Failed to fetch server status", err);
        setOnline(0); // fallback default
      }
    }

    fetchStatus();
  }, []);

  return (
    <footer className="bg-[rgb(49,50,51)] h-12 flex items-center justify-center border-t-[3px] border-border-primary">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500" />
        <p className="text-[10px]  text-white">
          <SkeletonValue value={online} /> Players Online In Game
        </p>
      </div>
    </footer>
  );
}
