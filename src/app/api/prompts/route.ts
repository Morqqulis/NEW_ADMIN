import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const stationId = searchParams.get('stationId')

  try {
    // Use Prisma query instead of Drizzle
    const query = stationId 
      ? { where: { id: parseInt(stationId) } }
      : {}

    const stationPrompts = await db.station.findMany({
      ...query,
      select: {
        id: true,
        systemPrompt: true,
        hourlyPrompt0: true,
        hourlyPrompt10: true,
        hourlyPrompt20: true,
        hourlyPrompt30: true,
        hourlyPrompt40: true,
        hourlyPrompt50: true,
        hourlyPrompt55: true,
        newsPrompt: true,
        weatherPrompt: true,
        trafficPrompt: true,
      }
    })

    return NextResponse.json(stationPrompts)
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()
    
    const updatedPrompts = await db.station.update({
      where: { id: parseInt(id) },
      data,
      select: {
        id: true,
        systemPrompt: true,
        hourlyPrompt0: true,
        hourlyPrompt10: true,
        hourlyPrompt20: true,
        hourlyPrompt30: true,
        hourlyPrompt40: true,
        hourlyPrompt50: true,
        hourlyPrompt55: true,
        newsPrompt: true,
        weatherPrompt: true,
        trafficPrompt: true,
      }
    })

    return NextResponse.json(updatedPrompts)
  } catch (error) {
    console.error('Error updating prompts:', error)
    return NextResponse.json(
      { error: 'Failed to update prompts' },
      { status: 500 }
    )
  }
} 