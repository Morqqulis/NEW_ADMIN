import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
	try {
		// Test database connection
		const locationCount = await prisma.location.count()
		const clientCount = await prisma.client.count()
		const stationCount = await prisma.station.count()

		return NextResponse.json({
			status: 'ok',
			counts: {
				locations: locationCount,
				clients: clientCount,
				stations: stationCount,
			},
		})
	} catch (error) {
		console.error('Database test failed:', error)
		return NextResponse.json({ error: 'Database connection test failed', details: error }, { status: 500 })
	}
}
