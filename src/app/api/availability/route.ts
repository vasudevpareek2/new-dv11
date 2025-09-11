import { NextResponse } from 'next/server';
import { getBookedDates } from '@/lib/notion';

export async function POST(request: Request) {
  try {
    const { villaId, checkIn, checkOut } = await request.json();

    if (!villaId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get all bookings that overlap with the requested date range
    const bookedDates = await getBookedDates(villaId, checkIn, checkOut);
    
    // If there are any bookings that overlap, the dates are not available
    const isAvailable = bookedDates.length === 0;

    return NextResponse.json({
      available: isAvailable,
      bookedDates,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
