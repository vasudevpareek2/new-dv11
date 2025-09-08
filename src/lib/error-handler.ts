import { NextResponse } from 'next/server';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};

export const handleGlobalErrors = (err: any, _req: Request) => {
  // Log error for debugging
  console.error('Global error handler:', err);

  // Default error response
  let error = { ...err };
  error.message = err.message;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join('. ');
    error = createError(`Invalid input: ${message}`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = createError(`Duplicate field value: ${field}. Please use another value.`, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    error = createError('Invalid token. Please log in again!', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = createError('Your token has expired! Please log in again.', 401);
  }

  // Return JSON response
  return NextResponse.json(
    {
      status: error.status || 'error',
      message: error.isOperational ? error.message : 'Something went wrong!',
    },
    {
      status: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// Middleware to catch async errors
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch(next);
  };
};
