import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matscraft | Mallard Labs",
  description: "Mine ores. Earn mats. Build cool stuff. Play with friends. matsFi meets Minecraft.",
  generator: 'v0.dev',
  
  // Open Graph metadata for Facebook, Discord, LinkedIn
  openGraph: {
    title: "Matscraft | Mallard Labs",
    description: "Mine ores. Earn mats. Build cool stuff. Play with friends. matsFi meets Minecraft.",
    url: 'https://matscraft.xyz', // Replace with your actual domain
    siteName: 'Matscraft',
    images: [
      {
        url: 'https://matscraft.xyz/matscraft-og-image.png', // Absolute URL required for social platforms
        width: 1200,
        height: 630,
        alt: 'Matscraft - matsFi meets Minecraft, by Mallard Labs',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: "Matscraft | Mallard Labs",
    description: "Mine ores. Earn mats. Build cool stuff. Play with friends. matsFi meets Minecraft.",
    images: ['https://matscraft.xyz/matscraft-twitter-image.png'], // Absolute URL required for Twitter
    creator: '@MallardLabs', // Replace with your Twitter handle
  },
  
  // Additional metadata
  keywords: ['minecraft', 'blockchain', 'gaming', 'crypto', 'matsfi', 'mezo'],
  authors: [{ name: 'Mallard Labs' }],
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=open_in_new" 
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
