import { NextResponse } from 'next/server';
import { getBookedDates } from '@/lib/notion';

export async function POST(request: Request) {
  try {
    console.log('Received request to /api/availability/blocked');
    
    const requestBody = await request.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const { villaId } = requestBody;

    if (!villaId) {
      console.error('Missing villaId in request');
      return NextResponse.json(
        { error: 'Villa ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching bookings for villa: ${villaId}`);
    
    try {
      // Get all future bookings for this villa
      const today = new Date().toISOString().split('T')[0];
      console.log(`Fetching bookings from ${today} to 2100-12-31`);
      
      const futureBookings = await getBookedDates(villaId, today, '2100-12-31');
      console.log(`Found ${futureBookings.length} future bookings`);

      // Convert to date ranges that need to be blocked in the date picker
      const blockedRanges = futureBookings.map(booking => ({
        start: booking.checkIn,
        end: booking.checkOut
      }));

      console.log('Returning blocked ranges:', JSON.stringify(blockedRanges, null, 2));
      
      return NextResponse.json({
        blockedRanges,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorName = error instanceof Error ? error.name : 'Error';
      
      console.error('Error in Notion API call:', {
        message: errorMessage,
        stack: errorStack,
        name: errorName
      });
      throw error;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : 'Error';
    
    console.error('Error in /api/availability/blocked:', {
      message: errorMessage,
      stack: errorStack,
      name: errorName
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch blocked dates',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
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
