import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
	try {
		const clients = await db.client.findMany({
			orderBy: {
				name: 'asc',
			},
		})

		return NextResponse.json(clients)
	} catch (error) {
		console.error('Error fetching clients:', error)
		return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json()

		const client = await db.client.create({
			data: {
				name: data.name,
				email: data.email,
				company: data.company,
				website: data.website,
				logo: data.logo,
				status: data.status || 'active',
				stationIds: data.stationIds || [],
			},
		})

		return NextResponse.json(client)
	} catch (error) {
		console.error('Error creating client:', error)
		return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
	}
}
