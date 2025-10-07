import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors';

// Error handling middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      message: error.message,
    });
    return;
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: error.message,
    });
    return;
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: 'Invalid Token',
      message: 'Invalid authentication token',
    });
    return;
  }

  // Handle JWT expired errors
  if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'Token Expired',
      message: 'Authentication token has expired',
    });
    return;
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'Something went wrong',
  });
};

// Not found middleware
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
