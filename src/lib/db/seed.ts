import { PrismaClient } from '@prisma/client'
import { mockStations, mockLocations, mockClients, mockVoices } from '@/lib/mock-data'

const prisma = new PrismaClient()

async function seed() {
  try {
    // Clear existing data in reverse order of dependencies
    console.log('Clearing existing data...')
    await prisma.Station.deleteMany()
    await prisma.Voice.deleteMany()
    await prisma.Location.deleteMany()
    await prisma.Client.deleteMany()

    // First seed clients (parent table)
    console.log('Seeding clients...')
    for (const client of mockClients) {
      await prisma.Client.create({
        data: {
          id: client.id, // Keep the specific IDs for relationships
          name: client.name,
          email: client.email,
          company: client.company,
          website: client.website,
          logo: client.logo,
          stationIds: client.stationIds,
          status: client.status,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }

    // Then seed locations
    console.log('Seeding locations...')
    for (const location of mockLocations) {
      await prisma.Location.create({
        data: {
          id: location.id, // Keep the specific IDs for relationships
          name: location.name,
          country: location.country,
          city: location.city,
          timezone: location.timezone,
          createdAt: new Date()
        }
      })
    }

    // Then seed stations (child table)
    console.log('Seeding stations...')
    for (const station of mockStations) {
      await prisma.Station.create({
        data: {
          name: station.name,
          stationId: station.stationId,
          locationId: station.locationId,
          clientId: station.clientId,
          website: station.website,
          status: station.status,
          omniplayerUrl: station.omniplayerUrl,
          clientSecret: station.clientSecret,
          username: station.username,
          password: station.password,
          systemPrompt: station.systemPrompt,
          hourlyPrompt0: station.hourlyPrompt0,
          hourlyPrompt10: station.hourlyPrompt10,
          hourlyPrompt20: station.hourlyPrompt20,
          hourlyPrompt30: station.hourlyPrompt30,
          hourlyPrompt40: station.hourlyPrompt40,
          hourlyPrompt50: station.hourlyPrompt50,
          hourlyPrompt55: station.hourlyPrompt55,
          newsPrompt: station.newsPrompt,
          weatherPrompt: station.weatherPrompt,
          trafficPrompt: station.trafficPrompt,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }

    // Finally seed voices
    console.log('Seeding voices...')
    for (const voice of mockVoices) {
      await prisma.Voice.create({
        data: {
          name: voice.name,
          voiceId: voice.voiceId,
          gender: voice.gender,
          language: voice.language,
          accent: voice.accent,
          age: voice.age,
          category: voice.category,
          country: voice.country,
          status: voice.status,
          createdAt: new Date()
        }
      })
    }

    console.log('Seeding completed successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed() 