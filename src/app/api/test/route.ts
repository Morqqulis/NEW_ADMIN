import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const locationCount = await db.location.count();
    const clientCount = await db.client.count();
    const stationCount = await db.station.count();

    return NextResponse.json({
      status: 'ok',
      counts: {
        locations: locationCount,
        clients: clientCount,
        stations: stationCount
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { error: 'Database connection test failed', details: error },
      { status: 500 }
    );
  }
} 