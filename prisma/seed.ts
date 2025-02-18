import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	try {
		// Clear existing data
		await prisma.station.deleteMany()
		await prisma.location.deleteMany()
		await prisma.client.deleteMany()
		await prisma.voice.deleteMany()

		// Create initial client
		const client = await prisma.client.create({
			data: {
				name: 'Demo Radio Group',
				email: 'demo@radiogroup.com',
				company: 'Demo Radio Group',
				website: 'https://demo.radiogroup.com',
				status: 'active',
				stationIds: [],
				apiKey: null,
				apiKeyLastGenerated: null,
			},
		})

		// Create locations
		const amsterdam = await prisma.location.create({
			data: {
				name: 'Amsterdam Studio',
				code: 'NL',
				city: 'Amsterdam',
				country: 'Netherlands',
				timezone: 'Europe/Amsterdam',
			},
		})

		await prisma.location.createMany({
			data: [
				{
					name: 'London Studio',
					code: 'GB',
					city: 'London',
					country: 'United Kingdom',
					timezone: 'Europe/London',
				},
				{
					name: 'Berlin Studio',
					code: 'DE',
					city: 'Berlin',
					country: 'Germany',
					timezone: 'Europe/Berlin',
				},
				{
					name: 'Paris Studio',
					code: 'FR',
					city: 'Paris',
					country: 'France',
					timezone: 'Europe/Paris',
				},
				{
					name: 'Madrid Studio',
					code: 'ES',
					city: 'Madrid',
					country: 'Spain',
					timezone: 'Europe/Madrid',
				},
			],
		})

		// Create initial station
		await prisma.station.create({
			data: {
				name: 'Radio Demo',
				stationId: 'DEMO1',
				locationId: amsterdam.id,
				website: 'https://radiodemo.com',
				status: 'active',
				omniplayerUrl: 'https://demo.omniplayer.fm',
				clientId: client.id,
				clientSecret: 'demo_secret',
				username: 'demo_user',
				password: 'demo_pass',
				systemPrompt: 'You are a radio host for Demo Radio...',
				hourlyPrompt0: "It's the top of the hour...",
				newsPrompt: 'Here are the latest news updates...',
				weatherPrompt: 'The weather forecast for today...',
				trafficPrompt: 'Traffic update for the Amsterdam area...',
			},
		})

		console.log('Seed data inserted successfully')
	} catch (error) {
		console.error('Error seeding data:', error)
		process.exit(1)
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
