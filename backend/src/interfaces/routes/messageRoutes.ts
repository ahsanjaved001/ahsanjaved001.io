import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';
import { asyncHandler } from '../middleware/errorHandler';
import {
  validateMessage,
  validateQuery,
  rateLimiter,
} from '../middleware/validation';

const router = Router();
const messageController = new MessageController();

// POST /messages - Create a new message (with rate limiting)
router.post(
  '/',
  rateLimiter(5, 15 * 60 * 1000), // 5 requests per 15 minutes
  validateMessage,
  asyncHandler(messageController.createMessage)
);

// GET /messages - Get all messages
router.get('/', asyncHandler(messageController.getAllMessages));

// GET /messages/:id - Get message by ID
router.get('/:id', asyncHandler(messageController.getMessageById));

// GET /messages/search/email?email=user@example.com - Get messages by email
router.get(
  '/search/email',
  validateQuery(['email']),
  asyncHandler(messageController.getMessagesByEmail)
);

// PUT /messages/:id/read - Mark message as read
router.put('/:id/read', asyncHandler(messageController.markMessageAsRead));

// DELETE /messages/:id - Delete message
router.delete('/:id', asyncHandler(messageController.deleteMessage));

export default router;
