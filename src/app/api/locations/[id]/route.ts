import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { locations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const id = parseInt(params.id);

    const updatedLocation = await db
      .update(locations)
      .set(data)
      .where(eq(locations.id, id))
      .returning();

    if (!updatedLocation.length) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedLocation[0]);
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const deletedLocation = await db
      .delete(locations)
      .where(eq(locations.id, id))
      .returning();

    if (!deletedLocation.length) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedLocation[0]);
  } catch (error) {
    console.error('Error deleting location:', error);
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    );
  }
} 