// Types for Razorpay
export interface RazorpayPaymentSuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  [key: string]: any; // For any additional properties
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentSuccess) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
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
  notes?: Record<string, string>;
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
  retry?: {
    enabled: boolean;
    max_count: number;
  };
  timeout?: number;
  remember_customer?: boolean;
  config?: {
    display?: {
      preferences?: {
        show_default_blocks?: boolean;
      };
    };
  };
  [key: string]: any; // For any additional properties
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: any) => void) => void;
  close: () => void;
}

export interface RazorpayStatic {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayStatic;
  }
}

/**
 * Loads the Razorpay script dynamically
 * @returns A promise that resolves with the Razorpay constructor when loaded
 */
export function loadRazorpay(): Promise<RazorpayStatic> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay can only be loaded in the browser'));
      return;
    }

    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        reject(new Error('Failed to load Razorpay'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
}

/**
 * Type guard to check if an object is a Razorpay instance
 */
export function isRazorpayInstance(obj: any): obj is RazorpayInstance {
  return (
    obj &&
    typeof obj.open === 'function' &&
    typeof obj.on === 'function' &&
    typeof obj.close === 'function'
  );
}
