"use client"

import { useState, useEffect } from "react"

interface ServerStatus {
  players: {
    online: number
    max: number
  }
  online: boolean
}

export function PlayerCount() {
  const [playerCount, setPlayerCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPlayerCount = async () => {
    try {
      const response = await fetch('https://api.mcsrvstat.us/bedrock/3/play.matscraft.xyz')
      const data: ServerStatus = await response.json()
      setPlayerCount(data.players.online)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch player count:', error)
      setPlayerCount(null)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately
    fetchPlayerCount()
    
    // Set up interval to fetch every 5 minutes (300,000 ms)
    const interval = setInterval(fetchPlayerCount, 5 * 60 * 1000)
    
    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  const getPlayerCountText = () => {
    if (isLoading) return "// CONNECTING TO SERVER..."
    if (playerCount === null) return "// OFFLINE"
    return `// ${playerCount} PLAYER${playerCount === 1 ? '' : 'S'} ONLINE`
  }

  return (
    <span className="text-sm md:text-base font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
      {getPlayerCountText()}
    </span>
  )
} 