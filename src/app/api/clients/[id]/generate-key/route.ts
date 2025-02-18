import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: Request, { params }: { params: { id: string } }) {
	try {
		const clientId = parseInt(params.id)
		const apiKey = crypto.randomBytes(32).toString('hex')

		const updatedClient = await prisma.client.update({
			where: { id: clientId },
			data: {
				apiKey,
				apiKeyLastGenerated: new Date(),
			},
		})

		return NextResponse.json({
			apiKey: updatedClient.apiKey,
			lastGenerated: updatedClient.apiKeyLastGenerated,
		})
	} catch (error) {
		console.error('Error generating API key:', error)
		return NextResponse.json({ error: 'Failed to generate API key' }, { status: 500 })
	}
}
