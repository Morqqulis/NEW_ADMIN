import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const locations = await db.location.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    console.log('Fetched locations from DB:', locations); // Debug log
    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const location = await db.location.create({
      data: {
        name: data.name,
        code: data.code,
        city: data.city,
        country: data.country,
        timezone: data.timezone,
      }
    });
    
    return NextResponse.json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
} 