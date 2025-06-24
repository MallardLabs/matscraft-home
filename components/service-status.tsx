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

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // 1️⃣ Gather the list of tags to check
        let tags = customTags
        if (!tags || tags.length === 0) {
          const tagRes = await fetch("https://status.mallardlabs.xyz/api/monitor", { cache: "no-store" })
          if (!tagRes.ok) throw new Error("Failed to fetch tag list")
          const tagJson = await tagRes.json()

          // The API structure isn't documented, so we try a few common shapes.
          if (Array.isArray(tagJson)) {
            tags = tagJson as string[]
          } else if (tagJson?.tags && Array.isArray(tagJson.tags)) {
            tags = tagJson.tags as string[]
          } else if (tagJson?.data?.tags && Array.isArray(tagJson.data.tags)) {
            tags = tagJson.data.tags.map((t: any) => t.tag ?? t.name ?? t)
          } else {
            tags = []
          }
        }

        if (!tags || tags.length === 0) throw new Error("No tags returned from status API")

        // 2️⃣ Query every tag concurrently
        const tagResults = await Promise.all(
          tags.map(async (tag) => {
            try {
              const res = await fetch(
                `https://status.mallardlabs.xyz/api/status?tag=${encodeURIComponent(tag)}`,
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
    loading: { color: "bg-gray-400", label: "…" },
    error: { color: "bg-gray-400", label: "ERROR" },
    up: { color: "bg-green-500", label: "UP" },
    degraded: { color: "bg-orange-400", label: "DEGRADED" },
    down: { color: "bg-red-500", label: "DOWN" },
  } as const

  const { color, label } = styles[status]

  return (
    <>
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm text-gray-300">{label}</span>
    </>
  )
} 