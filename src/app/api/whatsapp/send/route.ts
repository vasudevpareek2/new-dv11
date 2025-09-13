import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client with environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Should be in format 'whatsapp:+1234567890'

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { to, message } = await request.json();

    // Validate required fields
    if (!to || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to and message are required' },
        { status: 400 }
      );
    }

    // Format the phone number to E.164 format if needed
    const toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    // Send the WhatsApp message
    const twilioResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: toFormatted,
    });

    return NextResponse.json({
      success: true,
      messageSid: twilioResponse.sid,
    });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send WhatsApp message' 
      },
      { status: 500 }
    );
  }
}
