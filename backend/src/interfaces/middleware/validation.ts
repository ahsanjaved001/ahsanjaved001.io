import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation middleware for message creation
export const validateMessage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),

  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please check your input',
        details: errors.array(),
      });
    }
    return next();
  },
];

// Validation middleware for query parameters
export const validateQuery = (validParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const queryKeys = Object.keys(req.query);
    const invalidParams = queryKeys.filter(key => !validParams.includes(key));

    if (invalidParams.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Query Parameters',
        message: `Invalid parameters: ${invalidParams.join(', ')}`,
        validParams,
      });
    }

    return next();
  };
};

// Rate limiting middleware (basic implementation)
export const rateLimiter = (
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || 'unknown';
    const now = Date.now();

    const clientData = requests.get(clientId);

    if (!clientData || now > clientData.resetTime) {
      requests.set(clientId, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
      });
    }

    clientData.count++;
    return next();
  };
};
