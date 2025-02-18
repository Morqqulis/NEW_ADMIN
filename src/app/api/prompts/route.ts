import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const stationId = searchParams.get('stationId')

	try {
		const stationPrompts = await prisma.station.findMany({
			where: stationId ? { id: parseInt(stationId) } : undefined,
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
			},
		})

		return NextResponse.json(stationPrompts)
	} catch (error) {
		console.error('Error fetching prompts:', error)
		return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 })
	}
}

export async function PUT(request: Request) {
	try {
		const { id, ...data } = await request.json()

		const updatedPrompts = await prisma.station.update({
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
			},
		})

		return NextResponse.json(updatedPrompts)
	} catch (error) {
		console.error('Error updating prompts:', error)
		return NextResponse.json({ error: 'Failed to update prompts' }, { status: 500 })
	}
}
