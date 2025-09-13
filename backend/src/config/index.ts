import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'RAZORPAY_WEBHOOK_SECRET',
  'APP_URL'
] as const;

// Validate required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID as string,
    keySecret: process.env.RAZORPAY_KEY_SECRET as string,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET as string,
  },
  appUrl: process.env.APP_URL as string,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
