import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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

  async createBooking(bookingData: BookingData) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: this.mapBookingToProperties(bookingData),
      });
      return { success: true, pageId: response.id };
    } catch (error) {
      console.error('Error creating Notion page:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
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
