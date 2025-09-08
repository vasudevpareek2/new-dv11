declare module 'razorpay' {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayPaymentSuccess) => void;
    prefill: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme: {
      color: string;
    };
    modal?: {
      ondismiss?: () => void;
      escape?: boolean;
      handle_back?: boolean;
      confirm_close?: boolean;
      backdropclose?: boolean;
    };
    retry?: {
      enabled: boolean;
      max_count: number;
    };
    timeout?: number;
  }

  interface RazorpayPaymentSuccess {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayInstance {
    new (options: RazorpayOptions): RazorpayInstance;
    open: () => void;
    on: (event: string, callback: (response: any) => void) => void;
    close: () => void;
  }

  interface RazorpayStatic {
    (options: RazorpayOptions): RazorpayInstance;
  }
}

declare global {
  interface Window {
    Razorpay: import('razorpay').RazorpayStatic;
  }
}
