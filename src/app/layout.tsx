import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"



export const metadata: Metadata = {
  title: "Matscraft | Mallard Labs",
  description: "Mine ores. Earn mats. Build cool stuff. Play with friends. matsFi meets Minecraft.",
  
  // Open Graph metadata for Facebook, Discord, LinkedIn
  openGraph: {
    title: "Matscraft | Mallard Labs",
    description: "Mine ores. Earn mats. Build cool stuff. Play with friends. matsFi meets Minecraft.",
    url: 'https://matscraft.xyz', // Replace with your actual domain
    siteName: 'Matscraft',
    images: [
      {
        url: 'https://matscraft.xyz/images/matscraft-og-image.png', // Absolute URL required for social platforms
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
    images: ['https://matscraft.xyz/images/matscraft-twitter-image.png'], // Absolute URL required for Twitter
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
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script 
          defer 
          src="https://cloud.umami.is/script.js" 
          data-website-id="7b8e2f9f-e4d4-4e6c-899f-4eacf5cfc86d"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
