import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { stations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const body = await request.json()
		const result = await prisma.station.update({
			where: { id: parseInt(params.id, 10) },
			data: body,
		})
		return NextResponse.json(result)
	} catch (error) {
		console.error('Failed to update station:', error)
		return NextResponse.json({ error: 'Failed to update station' }, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.station.delete({ where: { id: parseInt(params.id, 10) } })
		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Failed to delete station:', error)
		return NextResponse.json({ error: 'Failed to delete station' }, { status: 500 })
	}
}
