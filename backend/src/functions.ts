import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import certificationRoutes from './interfaces/routes/certificationRoutes';
import messageRoutes from './interfaces/routes/messageRoutes';
import {
  errorHandler,
  notFoundHandler,
} from './interfaces/middleware/errorHandler';
import { firebaseConfig } from './infrastructure/config/FirebaseConfig';

// Initialize Firebase using our custom config
firebaseConfig.initialize();

const app = express();

// Trust proxy for Cloud Run (required for X-Forwarded-For headers)
app.set('trust proxy', true);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [
      'https://ahsanjaved001-72760.web.app',
      'https://ahsanjaved001-72760.firebaseapp.com',
      'http://localhost:3030',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many requests from this IP, please try again later.',
  },
  // Skip rate limiting for health checks
  skip: req => req.path === '/health',
  // Use custom key generator for Cloud Run
  keyGenerator: req => {
    // Use X-Forwarded-For header if available, otherwise use connection remote address
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: 'production',
  });
});

// API routes
app.use('/certifications', certificationRoutes);
app.use('/messages', messageRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ahsan Javed Portfolio API',
    version: '1.0.0',
    endpoints: {
      certifications: '/certifications',
      messages: '/messages',
      health: '/health',
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Export the Express app as a Firebase Function v2
export const api = onRequest(
  {
    region: 'us-central1',
    timeoutSeconds: 60,
    memory: '256MiB',
  },
  app
);
