"use client"

import { useEffect, useState } from "react"

// Possible high-level states we want to surface to the UI
type OverallStatus = "loading" | "up" | "degraded" | "down" | "error"

interface ServiceStatusProps {
  /**
   * Optional list of tags to monitor. If omitted the component will query the
   * Mallard Labs status API to discover all available tags automatically.
   */
  tags?: string[]
  /**
   * Interval (in ms) between refreshes. Defaults to 30 s.
   */
  refreshIntervalMs?: number
}

/**
 * Small traffic-light style indicator reflecting the overall Mallard Labs
 * service health.
 *
 * The logic is:
 *  – All requested tags UP   → green  + "UP"
 *  – Some down, some up      → orange + "DEGRADED"
 *  – All down                → red    + "DOWN"
 *
 * You can optionally pass an explicit list of tags to check. Otherwise it will
 * auto-discover every tag returned by `/api/monitor`.
 */
export function ServiceStatus({ tags: customTags, refreshIntervalMs = 30_000 }: ServiceStatusProps) {
  const [status, setStatus] = useState<OverallStatus>("loading")
  const componentId = useState(() => Math.random().toString(36).substr(2, 9))[0]

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        console.log(`[${componentId}] Starting load function`)
        // 1️⃣ Gather the list of tags to check
        let tags = customTags
        if (!tags || tags.length === 0) {
          console.log(`[${componentId}] Fetching tags from API`)
          // Use our secure server-side API route instead of direct external calls
          const tagRes = await fetch("/api/status", { cache: "no-store" })
          if (!tagRes.ok) throw new Error("Failed to fetch tag list")
          const tagJson = await tagRes.json()

          // The API returns an array of monitor objects with tag fields
          if (Array.isArray(tagJson)) {
            console.log(`[${componentId}] Raw tagJson from API:`, tagJson)
            tags = tagJson.map((monitor: any) => {
              const tag = monitor?.tag
              console.log(`[${componentId}] Monitor:`, monitor?.name, 'Tag:', tag, 'Type:', typeof tag)
              return tag
            }).filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
          } else {
            tags = []
          }
          
          console.log(`[${componentId}] Final extracted tags:`, tags)
        }

        if (!tags || tags.length === 0) throw new Error("No tags returned from status API")

        // 2️⃣ Query every tag concurrently
        console.log(`[${componentId}] About to query tags:`, tags)
        const tagResults = await Promise.all(
          tags.map(async (tag) => {
            console.log(`[${componentId}] Processing tag:`, tag, 'Type:', typeof tag)
            try {
              // Use our secure server-side API route
              const res = await fetch(
                `/api/status?tag=${encodeURIComponent(tag)}`,
                { cache: "no-store" }
              )
              if (!res.ok) return false
              const data = await res.json()

              // Normalise a boolean "is this tag up?" value
              if (typeof data === "string") return data.toLowerCase() === "up"
              if (typeof data?.status === "string") return data.status.toLowerCase() === "up"
              if (typeof data?.data?.status === "string") return data.data.status.toLowerCase() === "up"
              if (Array.isArray(data?.monitors)) {
                return data.monitors.every((m: any) => (m.status ?? "").toLowerCase() === "up")
              }
              return false
            } catch {
              // Network/parsing error? Treat as DOWN for safety.
              return false
            }
          })
        )

        if (cancelled) return

        const upCount = tagResults.filter(Boolean).length
        const total = tagResults.length

        if (upCount === total) setStatus("up")
        else if (upCount === 0) setStatus("down")
        else setStatus("degraded")
      } catch {
        if (!cancelled) setStatus("error")
      }
    }

    load()
    const id = setInterval(load, refreshIntervalMs)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [customTags, refreshIntervalMs])

  const styles = {
    loading: { color: "bg-gray-400", label: null },
    error: { color: "bg-gray-400", label: "ERROR" },
    up: { color: "bg-green-500", label: "UP" },
    degraded: { color: "bg-orange-400", label: "DEGRADED" },
    down: { color: "bg-red-500", label: "DOWN" },
  } as const

  const { color, label } = styles[status]

  return (
    <>
      <div className={`w-3 h-3 rounded-full ${color}`} />
      {status === "loading" ? (
        <div className="inline-flex items-center">
          <svg 
            className="animate-spin h-4 w-4 text-gray-300" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <span className="text-sm text-gray-300">{label}</span>
      )}
      <a 
        href="https://status.mallardlabs.xyz/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
        aria-label="View detailed status page"
      >
        <span 
          className="material-symbols-outlined text-gray-300 text-base inline-flex items-center"
          style={{ fontSize: '16px', transform: 'translateY(1px)' }}
        >
          open_in_new
        </span>
      </a>
    </>
  )
} 