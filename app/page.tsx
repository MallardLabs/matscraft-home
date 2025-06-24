"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlayerCount } from "@/components/player-count"
import { ServiceStatus } from "@/components/service-status"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image with fade-in */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-[fadeIn_1s_ease-in-out_0.5s_forwards]"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          <div className="flex items-center">
            <a 
              href="https://mallardlabs.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/mallardlabs-logo.svg"
                alt="Mallard Labs"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </a>
          </div>

          <div className="flex items-center space-x-5">
            <a 
              href="https://x.com/MallardLabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors" 
              aria-label="X (Twitter)"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="https://github.com/MallardLabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors" 
              aria-label="GitHub"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={28}
                height={28}
                className="w-7 h-7 brightness-0 invert hover:opacity-75 transition-opacity"
              />
            </a>
            <a 
              href="https://discord.mezo.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors" 
              aria-label="Discord"
            >
              <Image
                src="/discord.svg"
                alt="Discord"
                width={28}
                height={28}
                className="w-7 h-7 brightness-0 invert hover:opacity-75 transition-opacity"
              />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 text-center">
          {/* MATSCRAFT Logo - Further Reduced Size */}
          <div className="mb-6 md:mb-8">
            <Image
              src="/matscraft-logo.png"
              alt="MATSCRAFT"
              width={500}
              height={125}
              className="w-full max-w-sm md:max-w-lg lg:max-w-xl h-auto"
              priority
            />
          </div>

          {/* Static Subtitle - Optimized Responsive Text Sizing */}
          <div className="mb-8 md:mb-10 max-w-5xl lg:max-w-6xl xl:max-w-7xl">
            <h2
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Mine ores. Earn mats. Build cool stuff. Play with friends.
            </h2>
            <p
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-relaxed"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              matsFi meets Minecraft.
            </p>
          </div>

          {/* Simplified Play Button */}
          <a href="https://wiki.matscraft.xyz">
            <Button
              size="lg"
              className="bg-gray-700/90 hover:bg-gray-600/90 text-white border border-gray-500/50 hover:border-gray-400/70 px-8 py-4 text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg backdrop-blur-sm"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              Play now
            </Button>
          </a>
        </main>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 md:p-8 space-y-4 md:space-y-0">
          {/* Left Side */}
          <div className="text-white space-y-2">
            <div className="flex items-center space-x-3">
              <PlayerCount />
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm md:text-base font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                MALLARD ONLINE SERVICES
              </span>
              <ServiceStatus refreshIntervalMs={600_000} />
            </div>
          </div>

          {/* Right Side */}
          <div className="text-white">
            <div className="text-sm md:text-base mb-3 text-left" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
              POWERED BY
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://mezo.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/mezo.svg"
                  alt="Mezo"
                  width={120}
                  height={32}
                  className="h-6 md:h-8 w-auto"
                />
              </a>
              <span className="text-2xl md:text-3xl font-light">+</span>
              <a 
                href="https://drip.re" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/drip.svg"
                  alt="Drip"
                  width={100}
                  height={32}
                  className="h-6 md:h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
