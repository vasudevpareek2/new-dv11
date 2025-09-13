import { Client } from '@notionhq/client';

// Validate environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
  console.error('❌ NOTION_API_KEY is not set in environment variables');
  throw new Error('NOTION_API_KEY is not configured');
}

if (!NOTION_DATABASE_ID) {
  console.error('❌ NOTION_DATABASE_ID is not set in environment variables');
  throw new Error('NOTION_DATABASE_ID is not configured');
}

// Initialize Notion client with error handling
let notion: Client;
try {
  notion = new Client({ auth: NOTION_API_KEY });
  console.log('✅ Notion client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Notion client:', error);
  throw new Error('Failed to initialize Notion client');
}

// Type for booking data that will be stored in Notion
interface BookingData {
  villaName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  extraMattresses: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: 'pending' | 'completed' | 'failed';
}

class NotionService {
  private databaseId: string;

  constructor() {
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not set in environment variables');
    }
    this.databaseId = process.env.NOTION_DATABASE_ID;
  }

  /**
   * Creates a new booking in Notion database with validation and error handling
   * @param bookingData The booking data to store in Notion
   * @returns Promise with the result of the operation
   */
  async createBooking(bookingData: BookingData): Promise<{
    success: boolean;
    pageId?: string;
    url?: string;
    error?: string;
    details?: any;
  }> {
    // Input validation
    const requiredFields: Array<keyof BookingData> = [
      'villaName', 'checkIn', 'checkOut', 'customerName', 
      'customerEmail', 'customerPhone', 'amount', 'status'
    ];
    
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
      console.error(`❌ [NotionService] Validation error: ${errorMessage}`);
      return { 
        success: false, 
        error: errorMessage,
        details: { missingFields }
      };
    }

    try {
      console.log('📝 [NotionService] Creating booking with sanitized data');
      
      // Sanitize inputs
      const sanitizedData: BookingData = {
        ...bookingData,
        customerPhone: String(bookingData.customerPhone).replace(/\D/g, ''), // Remove non-numeric chars
        amount: Math.round(Number(bookingData.amount)), // Ensure amount is a number
        guests: Math.max(1, Math.min(10, Number(bookingData.guests) || 1)), // Clamp between 1-10
        extraMattresses: Math.max(0, Math.min(5, Number(bookingData.extraMattresses) || 0)) // Clamp 0-5
      };

      console.log('📋 [NotionService] Mapped properties for booking');
      const properties = this.mapBookingToProperties(sanitizedData);
      
      if (process.env.NODE_ENV !== 'production') {
        console.debug('🔍 [NotionService] Debug - Mapped properties:', 
          JSON.stringify(properties, null, 2));
      }
      
      console.log(`📤 [NotionService] Creating page in database: ${this.databaseId}`);
      const startTime = Date.now();
      
      const response = await notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: properties,
      });
      
      const duration = Date.now() - startTime;
      console.log(`✅ [NotionService] Successfully created booking in ${duration}ms. Page ID: ${response.id}`);
      
      // Get the public URL of the created page
      const pageUrl = `https://notion.so/${response.id.replace(/-/g, '')}`;
      
      return { 
        success: true, 
        pageId: response.id,
        url: pageUrl
      };
      
    } catch (error: unknown) {
      const errorObj = error as Record<string, any>;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorCode = errorObj?.code || 'UNKNOWN_ERROR';
      const statusCode = errorObj?.status || 500;
      
      // Log detailed error information
      console.error('❌ [NotionService] Error creating booking:', {
        error: errorMessage,
        code: errorCode,
        status: statusCode,
        databaseId: this.databaseId,
        timestamp: new Date().toISOString()
      });
      
      // Log additional debug info in non-production
      if (process.env.NODE_ENV !== 'production') {
        console.debug('🔍 [NotionService] Debug - Error details:', {
          headers: errorObj?.headers,
          request: errorObj?.request ? 'Request object exists' : undefined,
          response: errorObj?.response?.data || 'No response data'
        });
      }
      
      // Return structured error response
      return { 
        success: false, 
        error: 'Failed to create booking in Notion',
        details: {
          code: errorCode,
          status: statusCode,
          message: errorMessage,
          ...(process.env.NODE_ENV !== 'production' ? { debug: errorObj } : {})
        }
      };
    }
  }

  async updateBookingStatus(
    pageId: string, 
    status: 'pending' | 'completed' | 'failed',
    razorpayOrderId?: string,
    razorpayPaymentId?: string
  ) {
    try {
      const properties: any = {
        'Status': {
          select: {
            name: status.charAt(0).toUpperCase() + status.slice(1),
          },
        },
      };

      if (razorpayOrderId) {
        properties['Razorpay Order ID'] = {
          rich_text: [
            {
              text: {
                content: razorpayOrderId,
              },
            },
          ],
        };
      }

      if (razorpayPaymentId) {
        properties['Razorpay Payment ID'] = {
          rich_text: [
            {
              text: {
                content: razorpayPaymentId,
              },
            },
          ],
        };
      }

      await notion.pages.update({
        page_id: pageId,
        properties,
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating Notion page:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private mapBookingToProperties(booking: BookingData) {
    return {
      // Title property (must be the first property in Notion)
      'Villa': {
        title: [
          {
            text: {
              content: booking.villaName,
            },
          },
        ],
      },
      // Date properties - make sure these match exactly with Notion
      'Check In': {
        date: {
          start: booking.checkIn,
        },
      },
      'Check Out': {
        date: {
          start: booking.checkOut,
        },
      },
      // Text properties
      'Customer Name': {
        rich_text: [
          {
            text: {
              content: booking.customerName,
            },
          },
        ],
      },
      'Email': {
        email: booking.customerEmail,
      },
      'Phone': {
        phone_number: booking.customerPhone,
      },
      // Number properties
      'Guests': {
        number: booking.guests,
      },
      'Extra Mattresses': {
        number: booking.extraMattresses,
      },
      'Amount': {
        number: booking.amount / 100, // Convert to INR
      },
      'Status': {
        select: {
          name: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
        },
      },
      'Razorpay Order ID': {
        rich_text: booking.razorpayOrderId ? [
          {
            text: {
              content: booking.razorpayOrderId,
            },
          },
        ] : [],
      },
      'Razorpay Payment ID': {
        rich_text: booking.razorpayPaymentId ? [
          {
            text: {
              content: booking.razorpayPaymentId || '',
            },
          },
        ] : [],
      },
    };
  }
}

// Export a single instance of the service
const notionService = new NotionService();
export default notionService;
