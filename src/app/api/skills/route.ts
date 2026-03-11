import { NextResponse } from 'next/server'

// Shared in-memory endorsement counts (resets on cold start, that's fine for a portfolio)
const endorsements: Record<string, number> = {}

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Skill ID required' }, { status: 400 })
    }

    endorsements[id] = (endorsements[id] || 0) + 1

    return NextResponse.json({ id, endorsed: true, totalEndorsements: endorsements[id] })
  } catch (error) {
    console.error('Endorse error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
