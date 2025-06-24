"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, MessageCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/enhanced_5ea308c0-a90f-452d-9a8d-84dcee79368d%20%281%29.png-oBwj4DfLsxRn4eABPbIKyqYpdIEHfR.jpeg')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mallardlabs_logo-fNwQiDPep0Sd6n1JEOFXXj4r5eJ6qC.svg"
              alt="Mallard Labs"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Discord">
              <MessageCircle size={24} />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 text-center">
          {/* MATSCRAFT Logo - Further Reduced Size */}
          <div className="mb-6 md:mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-bdW5FCWgaVM0Q7jCEjcFKOIVsnKQEk.png"
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
          <Button
            size="lg"
            className="bg-gray-700/90 hover:bg-gray-600/90 text-white border border-gray-500/50 hover:border-gray-400/70 px-8 py-4 text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg backdrop-blur-sm"
            style={{ fontFamily: "Instrument Sans, sans-serif" }}
          >
            Play now
          </Button>
        </main>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 md:p-8 space-y-4 md:space-y-0">
          {/* Left Side */}
          <div className="text-white space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-sm md:text-base font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                // 3 PLAYERS ONLINE
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm md:text-base font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                MALLARD ONLINE SERVICES
              </span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">UP</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-white">
            <div className="text-sm md:text-base mb-3 text-left" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
              POWERED BY
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezo-koovPtt4EY25BBJqfPO69aehMkifZt.svg"
                alt="Mezo"
                width={120}
                height={32}
                className="h-6 md:h-8 w-auto"
              />
              <span className="text-2xl md:text-3xl font-light">+</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drip-tUCH9wNe6XyNwJXuIPNFeBS6UcM7MG.svg"
                alt="Drip"
                width={100}
                height={32}
                className="h-6 md:h-8 w-auto"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
