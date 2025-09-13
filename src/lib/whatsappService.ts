// Update this to your EC2 backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-ec2-instance-ip-or-domain';

interface WhatsAppMessageParams {
  to: string; // Phone number with country code (e.g., '918123456789')
  message: string;
  bookingDetails?: {
    bookingId?: string;
    amount?: number;
    checkInDate?: string;
    checkOutDate?: string;
    villaName?: string;
  };
}

export const sendWhatsAppMessage = async ({
  to,
  message,
  bookingDetails,
}: WhatsAppMessageParams): Promise<{ success: boolean; error?: string }> => {
  try {
    // Remove any non-numeric characters from the phone number
    const phoneNumber = to.replace(/\D/g, '');
    
    // If it's a 10-digit Indian number, add the country code (91)
    const formattedNumber = phoneNumber.length === 10 ? `91${phoneNumber}` : phoneNumber;

    // Format the message with booking details if provided
    let formattedMessage = message;
    if (bookingDetails) {
      formattedMessage += `\n\nBooking Details:`;
      if (bookingDetails.bookingId) formattedMessage += `\nBooking ID: ${bookingDetails.bookingId}`;
      if (bookingDetails.villaName) formattedMessage += `\nVilla: ${bookingDetails.villaName}`;
      if (bookingDetails.checkInDate && bookingDetails.checkOutDate) {
        formattedMessage += `\nDates: ${bookingDetails.checkInDate} to ${bookingDetails.checkOutDate}`;
      }
      if (bookingDetails.amount) {
        formattedMessage += `\nAmount: ₹${bookingDetails.amount.toLocaleString('en-IN')}`;
      }
    }

    // Call your EC2 backend API to send the WhatsApp message
    const response = await fetch(`${BACKEND_URL}/api/whatsapp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      body: JSON.stringify({
        to: formattedNumber,
        message: formattedMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to send WhatsApp message:', data.error);
      return { success: false, error: data.error || 'Failed to send WhatsApp message' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in sendWhatsAppMessage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
    };
  }
};

// Template messages
export const WhatsAppTemplates = {
  paymentSuccess: (_bookingId: string) =>
    `✅ Booking Confirmed!\n\nThank you for your booking. Your payment was successful.`,
  
  paymentFailed: (_bookingId: string) =>
    `❌ Payment Failed\n\nWe couldn't process your payment. Please try again or contact support.`,
  
  bookingDetails: (villaName: string, checkIn: string, checkOut: string, amount: number) =>
    `🏡 ${villaName}\n📅 ${checkIn} to ${checkOut}\n💵 Amount: ₹${amount.toLocaleString('en-IN')}`,
};
