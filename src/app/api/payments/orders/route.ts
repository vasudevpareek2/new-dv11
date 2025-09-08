import { NextResponse } from 'next/server';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.apiUrl;

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR' } = await request.json();
    
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Validate currency
    const validCurrencies = ['INR', 'USD', 'EUR', 'GBP'];
    if (!validCurrencies.includes(currency)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported currency' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/payments/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        amount: Math.round(amount * 100), // Convert to smallest currency unit (e.g., paise for INR, cents for USD)
        currency: currency.toLowerCase(),
        receipt: `order_${Date.now()}`,
        payment_capture: 1
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Payment API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorData.error?.description || 'Failed to create payment order',
          code: errorData.error?.code || 'payment_error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      createdAt: data.created_at
    });

  } catch (error: any) {
    console.error('Error in payment order creation:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        code: 'server_error'
      },
      { status: 500 }
    );
  }
}
