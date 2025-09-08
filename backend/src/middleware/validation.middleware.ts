import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// Custom error class for validation errors
class ValidationError extends Error {
  statusCode: number;
  errors: Array<{ param?: string; message: string; value?: any }>;

  constructor(
    message: string,
    errors: Array<{ param?: string; message: string; value?: any }> = []
  ) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.errors = errors;
  }
}

// Middleware to validate request
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    console.log('🔍 [Validation Debug] Starting validation');
    console.log('🔍 [Validation Debug] Request body:', req.body);
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      console.log('🔍 [Validation Debug] Validation errors:', errors.array());
      if (errors.isEmpty()) {
        console.log('🔍 [Validation Debug] Validation passed, calling next()');
        return next();
      }

      const errorMessages = errors.array().map((err: any) => {
        if (err.param) {
          return {
            param: err.param,
            message: err.msg || 'Invalid value',
            value: err.value,
          };
        }
        return {
          message: err.msg || 'Validation error',
        };
      });

      next(new ValidationError('Validation failed', errorMessages));
    } catch (error) {
      next(error);
    }
  };
};

// Error handling middleware
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        errors: err.errors,
      },
    });
  }

  // Handle other types of errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
