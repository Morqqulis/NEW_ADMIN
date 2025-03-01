import { Client } from './types'

export const mockClients: Client[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@radioone.com',
		company: 'Radio One',
		website: 'https://radioone.com',
		logo: '/logos/radio-one.png',
		stationIds: [1, 2],
		status: 'active' as const,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@mediagroup.com',
		company: 'Media Group',
		website: 'https://mediagroup.com',
		stationIds: [3],
		status: 'active' as const,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

export const mockStations = [
	{
		id: '1',
		name: 'Radio Rock',
		stationId: 'ROCK1',
		locationId: 1,
		clientId: 1,
		website: 'https://radiorock.com',
		status: 'active',
		omniplayerUrl: 'https://omniplayer.rock/stream1',
		clientSecret: 'secret_456',
		username: 'rockadmin',
		password: 'pass123',
		systemPrompt: 'You are a rock music radio host with high energy.',
		hourlyPrompt0: 'Announce the upcoming rock hits.',
		hourlyPrompt10: 'Share interesting facts about rock bands.',
		hourlyPrompt20: 'Talk about classic rock history.',
		hourlyPrompt30: 'Engage listeners with rock trivia.',
		hourlyPrompt40: 'Preview upcoming rock events.',
		hourlyPrompt50: 'Discuss trending rock news.',
		hourlyPrompt55: "Tease next hour's playlist.",
		newsPrompt: 'Cover rock music industry news.',
		weatherPrompt: 'Connect weather to rock songs.',
		trafficPrompt: 'Make traffic updates rock-themed.',
	},
	{
		id: '2',
		name: 'Smooth Jazz FM',
		stationId: 'JAZZ1',
		locationId: 2,
		clientId: 1,
		website: 'https://smoothjazz.fm',
		status: 'active',
		omniplayerUrl: 'https://omniplayer.jazz/stream1',
		clientSecret: 'secret_012',
		username: 'jazzadmin',
		password: 'pass456',
		systemPrompt: 'You are a smooth jazz radio host with a calm, sophisticated demeanor.',
		hourlyPrompt0: 'Set the mood for smooth jazz.',
		hourlyPrompt10: 'Share jazz artist spotlights.',
		hourlyPrompt20: 'Discuss jazz history.',
		hourlyPrompt30: 'Feature upcoming jazz events.',
		hourlyPrompt40: 'Preview evening jazz selections.',
		hourlyPrompt50: 'Jazz lifestyle segments.',
		hourlyPrompt55: "Preview next hour's artists.",
		newsPrompt: 'Cover jazz scene updates.',
		weatherPrompt: 'Relate weather to jazz moods.',
		trafficPrompt: 'Soothing traffic updates.',
	},
	{
		id: '3',
		name: 'Pop Hits Radio',
		stationId: 'POP1',
		locationId: 3,
		clientId: 2,
		website: 'https://pophits.radio',
		status: 'active',
		omniplayerUrl: 'https://omniplayer.pop/stream1',
		clientSecret: 'secret_678',
		username: 'popadmin',
		password: 'pass789',
		systemPrompt: 'You are an upbeat, trendy pop music radio host.',
		hourlyPrompt0: 'Start with top charts.',
		hourlyPrompt10: 'Celebrity news updates.',
		hourlyPrompt20: 'Social media trends.',
		hourlyPrompt30: 'Pop culture moments.',
		hourlyPrompt40: 'Artist interviews preview.',
		hourlyPrompt50: 'Entertainment news.',
		hourlyPrompt55: 'Next hour hits preview.',
		newsPrompt: 'Entertainment industry updates.',
		weatherPrompt: 'Fun weather updates.',
		trafficPrompt: 'Upbeat traffic reports.',
	},
	{
		id: '4',
		name: 'Classical Symphony',
		stationId: 'CLAS1',
		locationId: 4,
		clientId: 2,
		website: 'https://classical.fm',
		status: 'inactive',
		omniplayerUrl: 'https://omniplayer.classical/stream1',
		clientSecret: 'secret_234',
		username: 'classicaladmin',
		password: 'pass012',
		systemPrompt: 'You are a knowledgeable classical music host with refined taste.',
		hourlyPrompt0: 'Introduce symphony pieces.',
		hourlyPrompt10: 'Composer backgrounds.',
		hourlyPrompt20: 'Classical history moments.',
		hourlyPrompt30: 'Orchestra spotlights.',
		hourlyPrompt40: 'Concert previews.',
		hourlyPrompt50: 'Classical news updates.',
		hourlyPrompt55: 'Next hour repertoire.',
		newsPrompt: 'Classical music world updates.',
		weatherPrompt: 'Weather in musical terms.',
		trafficPrompt: 'Graceful traffic updates.',
	},
	{
		id: '5',
		name: 'Dance Energy',
		stationId: 'DANCE1',
		locationId: 5,
		clientId: 2,
		website: 'https://dance.fm',
		status: 'active',
		omniplayerUrl: 'https://omniplayer.dance/stream1',
		clientSecret: 'secret_890',
		username: 'danceadmin',
		password: 'pass345',
		systemPrompt: 'You are an energetic EDM and dance music radio host.',
		hourlyPrompt0: 'Start the dance party.',
		hourlyPrompt10: 'DJ spotlights.',
		hourlyPrompt20: 'Club scene updates.',
		hourlyPrompt30: 'Festival news.',
		hourlyPrompt40: 'Dance charts.',
		hourlyPrompt50: 'Remix previews.',
		hourlyPrompt55: 'Next set preview.',
		newsPrompt: 'Electronic music scene updates.',
		weatherPrompt: 'Party forecast.',
		trafficPrompt: 'Dance through traffic.',
	},
] as const

export const mockLocations = [
	{
		id: 1,
		name: 'New York Studio',
		code: 'NYC',
		country: 'US',
		city: 'New York',
		timezone: 'America/New_York',
		createdAt: new Date(),
	},
	{
		id: 2,
		name: 'London Office',
		code: 'LON',
		country: 'GB',
		city: 'London',
		timezone: 'Europe/London',
		createdAt: new Date(),
	},
	{
		id: 3,
		name: 'Los Angeles Studio',
		code: 'LAX',
		country: 'US',
		city: 'Los Angeles',
		timezone: 'America/Los_Angeles',
		createdAt: new Date(),
	},
	{
		id: 4,
		name: 'Berlin Studio',
		code: 'BER',
		country: 'DE',
		city: 'Berlin',
		timezone: 'Europe/Berlin',
		createdAt: new Date(),
	},
	{
		id: 5,
		name: 'Amsterdam Studio',
		code: 'AMS',
		country: 'NL',
		city: 'Amsterdam',
		timezone: 'Europe/Amsterdam',
		createdAt: new Date(),
	},
] as const

export const mockVoices = [
	{
		id: '1',
		name: 'John Smith',
		voiceId: 'en-US-1',
		gender: 'male',
		language: 'en-US',
		accent: 'American',
		age: 35,
		category: 'news',
		country: 'United States',
		status: 'active',
		createdAt: new Date(),
	},
]
