import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not set');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID is not set');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface NotionPageProperties {
  [key: string]: {
    type: string;
    select?: { name: string };
    rich_text?: Array<{ plain_text: string }>;
    title?: Array<{ plain_text: string }>;
    date?: { start: string; end: string };
  };
}

interface NotionPage {
  id: string;
  properties: NotionPageProperties;
}

type Booking = {
  checkIn: string;
  checkOut: string;
};

export async function getBookedDates(villaId: string, startDate: string, endDate: string): Promise<Booking[]> {
  try {
    console.log(`Fetching bookings for villa ${villaId} from ${startDate} to ${endDate}`);
    
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not set in environment variables');
    }

    // First, get all records to understand the structure
    const allRecords = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 5
    });
    
    if (allRecords.results.length === 0) {
      console.log('No records found in the database');
      return [];
    }
    
    // Log the first record to understand the structure
    console.log('Sample database record:', JSON.stringify(allRecords.results[0], null, 2));
    
    // Get the first page's properties to understand the structure
    const page = allRecords.results[0] as unknown as NotionPage;
    const propertyNames = Object.keys(page.properties);
    console.log('Available properties in the database:', propertyNames);
    
    // Try to find the villa property (case insensitive)
    const villaProperty = propertyNames.find(p => p.toLowerCase() === 'villa');
    if (!villaProperty) {
      throw new Error(`Could not find 'Villa' property in database. Available properties: ${propertyNames.join(', ')}`);
    }
    
    // Build filter based on property type
    const propertyType = Object.keys(page.properties[villaProperty]).find(
      k => k !== 'id' && k !== 'type' && k !== 'name'
    );
    
    if (!propertyType) {
      throw new Error(`Could not determine property type for '${villaProperty}'`);
    }
    
    console.log(`Using property '${villaProperty}' with type '${propertyType}'`);
    
    // Build the filter object with proper typing
    let filter: any;
    
    // Create the appropriate filter based on the property type
    if (propertyType === 'select') {
      filter = {
        property: villaProperty,
        select: { equals: villaId }
      };
    } else if (propertyType === 'rich_text') {
      filter = {
        property: villaProperty,
        rich_text: { equals: villaId }
      };
    } else if (propertyType === 'title') {
      filter = {
        property: villaProperty,
        title: { equals: villaId }
      };
    } else {
      // Fallback to dynamic property if type is not explicitly handled
      filter = {
        property: villaProperty,
        [propertyType]: { equals: villaId }
      } as any; // Type assertion as a last resort
    }
    
    console.log('Using filter:', JSON.stringify(filter, null, 2));
    
    // Query with the correct property type
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: filter
    });

    console.log(`Found ${response.results.length} bookings for villa ${villaId}`);

    // Process the results
    const results: Booking[] = [];
    
    for (const result of response.results) {
      const page = result as unknown as NotionPage;
      const props = page.properties;
      
      const checkIn = props['Check-in']?.date?.start;
      const checkOut = props['Check-out']?.date?.start;
      
      if (!checkIn || !checkOut) {
        console.error('Invalid booking data - missing check-in or check-out dates:', page);
        continue;
      }
      
      results.push({
        checkIn,
        checkOut
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('Error in getBookedDates:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      villaId,
      startDate,
      endDate,
      notionDatabaseId: process.env.NOTION_DATABASE_ID ? 'Set' : 'Not Set'
    });
    throw new Error(`Failed to fetch booked dates: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function isDateRangeAvailable(villaId: string, checkIn: string, checkOut: string): Promise<boolean> {
  try {
    const bookedDates = await getBookedDates(villaId, checkIn, checkOut);
    
    // If no bookings found for the date range, it's available
    return bookedDates.length === 0;
  } catch (error) {
    console.error('Error checking date range availability:', error);
    return false; // Default to not available if there's an error
  }
}

export async function getBlockedDates(villaId: string): Promise<{from: Date, to: Date}[]> {
  try {
    console.log(`Fetching blocked dates for villa: ${villaId}`);
    const apiUrl = '/api/availability/blocked';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ villaId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`Failed to fetch blocked dates: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.blockedRanges) {
      console.error('Invalid response format - missing blockedRanges:', data);
      return [];
    }

    console.log(`Found ${data.blockedRanges.length} blocked date ranges`);
    
    return data.blockedRanges.map((range: {start: string, end: string}) => ({
      from: new Date(range.start),
      to: new Date(range.end)
    }));
  } catch (error) {
    console.error('Error in getBlockedDates:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}
