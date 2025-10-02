import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { villaId, checkIn, checkOut } = await request.json();

    if (!villaId || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Stub implementation - always returns as available
    return NextResponse.json({
      available: true,
      bookedDates: [],
    });
  } catch (error) {
    console.error('Error in availability check:', error);
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
