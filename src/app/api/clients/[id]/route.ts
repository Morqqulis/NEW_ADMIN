import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const body = await request.json()
		const result = await prisma.client.update({
			where: { id: parseInt(params.id) },
			data: {
				name: body.name,
				email: body.email,
				company: body.company,
				status: body.status,
			},
		})

		return NextResponse.json(result)
	} catch (error) {
		console.error('Failed to update client:', error)
		return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.client.delete({ where: { id: parseInt(params.id) } })

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Failed to delete client:', error)
		return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
	}
}
