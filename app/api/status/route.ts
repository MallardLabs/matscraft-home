import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    
    // Build headers with API key (server-side only)
    const headers: HeadersInit = {}
    if (process.env.MALLARD_STATUS_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.MALLARD_STATUS_API_KEY}`
    }

    if (tag) {
      // Get status for specific tag
      const url = `https://status.mallardlabs.xyz/api/status?tag=${encodeURIComponent(tag)}`
      console.log('Fetching status for tag:', tag, 'URL:', url)
      
      const response = await fetch(url, { headers, cache: 'no-store' })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        return NextResponse.json({ 
          error: 'Failed to fetch tag status', 
          details: data,
          tag: tag,
          url: url 
        }, { status: response.status })
      }
      
      return NextResponse.json(data)
          } else {
        // Get list of all monitors/tags
        const response = await fetch(
          'https://status.mallardlabs.xyz/api/monitor',
          { headers, cache: 'no-store' }
        )
        
        if (!response.ok) {
          return NextResponse.json({ error: 'Failed to fetch monitors' }, { status: 500 })
        }
        
        const data = await response.json()
        console.log('Monitor API response:', data)
        return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Status API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 