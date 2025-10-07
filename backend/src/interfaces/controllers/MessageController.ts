import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../../application/services/MessageService';
import { ApiResponse, CreateMessageRequest } from '../../shared/types';
import { AppError } from '../../shared/errors';

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const messageData: CreateMessageRequest = req.body;
      const message = await this.messageService.createMessage(messageData);

      const response: ApiResponse = {
        success: true,
        data: message.toDTO(),
        message: 'Message sent successfully',
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAllMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const messages = await this.messageService.getAllMessages();
      const response: ApiResponse = {
        success: true,
        data: messages.map(msg => msg.toDTO()),
        message: 'Messages retrieved successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getMessageById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError('Message ID is required', 400);
      }

      const message = await this.messageService.getMessageById(id);

      if (!message) {
        throw new AppError('Message not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        data: message.toDTO(),
        message: 'Message retrieved successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getMessagesByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.query;

      if (!email || typeof email !== 'string') {
        throw new AppError('Email parameter is required', 400);
      }

      const messages = await this.messageService.getMessagesByEmail(email);
      const response: ApiResponse = {
        success: true,
        data: messages.map(msg => msg.toDTO()),
        message: `Messages for ${email} retrieved successfully`,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  markMessageAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError('Message ID is required', 400);
      }

      const message = await this.messageService.markMessageAsRead(id);

      const response: ApiResponse = {
        success: true,
        data: message.toDTO(),
        message: 'Message marked as read successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError('Message ID is required', 400);
      }

      await this.messageService.deleteMessage(id);

      const response: ApiResponse = {
        success: true,
        message: 'Message deleted successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
