import {
  MessageEntity,
  IMessageRepository,
} from '../../domains/message/entities/MessageEntity';
import { FirestoreMessageRepository } from '../../infrastructure/database/FirestoreMessageRepository';
import { emailService } from '../../infrastructure/external-apis/EmailService';
import { CreateMessageRequest } from '../../shared/types';
import { ValidationError, NotFoundError } from '../../shared/errors';
import { isValidEmail, sanitizeString } from '../../shared/utils';

// Use Cases for Message Domain
export class CreateMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(request: CreateMessageRequest): Promise<MessageEntity> {
    // Validate input
    if (
      !request.name ||
      !request.email ||
      !request.subject ||
      !request.message
    ) {
      throw new ValidationError('All fields are required');
    }

    if (!isValidEmail(request.email)) {
      throw new ValidationError('Invalid email format');
    }

    if (request.message.length < 10) {
      throw new ValidationError('Message must be at least 10 characters long');
    }

    // Sanitize input
    const sanitizedRequest = {
      name: sanitizeString(request.name),
      email: sanitizeString(request.email),
      subject: sanitizeString(request.subject),
      message: sanitizeString(request.message),
    };

    // Create message in database
    const message = await this.messageRepository.create(sanitizedRequest);

    // Send email notification (don't fail if email fails)
    try {
      const recipientEmail =
        process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
      if (recipientEmail) {
        await emailService.sendMessageNotification(message, recipientEmail);
        console.log('Email notification sent successfully');
      } else {
        console.warn(
          'NOTIFICATION_EMAIL not configured, skipping email notification'
        );
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't throw error - message was saved successfully
    }

    return message;
  }
}

export class GetMessagesUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(): Promise<MessageEntity[]> {
    return await this.messageRepository.findAll();
  }
}

export class GetMessageByIdUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(id: string): Promise<MessageEntity | null> {
    return await this.messageRepository.findById(id);
  }
}

export class GetMessagesByEmailUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(email: string): Promise<MessageEntity[]> {
    if (!isValidEmail(email)) {
      throw new ValidationError('Invalid email format');
    }
    return await this.messageRepository.findByEmail(email);
  }
}

export class MarkMessageAsReadUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(id: string): Promise<MessageEntity> {
    const message = await this.messageRepository.markAsRead(id);
    if (!message) {
      throw new NotFoundError('Message not found');
    }
    return message;
  }
}

export class DeleteMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(id: string): Promise<boolean> {
    const result = await this.messageRepository.delete(id);
    if (!result) {
      throw new NotFoundError('Message not found');
    }
    return result;
  }
}

// Service Layer
export class MessageService {
  private createMessageUseCase: CreateMessageUseCase;
  private getMessagesUseCase: GetMessagesUseCase;
  private getMessageByIdUseCase: GetMessageByIdUseCase;
  private getMessagesByEmailUseCase: GetMessagesByEmailUseCase;
  private markMessageAsReadUseCase: MarkMessageAsReadUseCase;
  private deleteMessageUseCase: DeleteMessageUseCase;

  constructor() {
    const repository = new FirestoreMessageRepository();
    this.createMessageUseCase = new CreateMessageUseCase(repository);
    this.getMessagesUseCase = new GetMessagesUseCase(repository);
    this.getMessageByIdUseCase = new GetMessageByIdUseCase(repository);
    this.getMessagesByEmailUseCase = new GetMessagesByEmailUseCase(repository);
    this.markMessageAsReadUseCase = new MarkMessageAsReadUseCase(repository);
    this.deleteMessageUseCase = new DeleteMessageUseCase(repository);
  }

  async createMessage(request: CreateMessageRequest): Promise<MessageEntity> {
    return await this.createMessageUseCase.execute(request);
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.getMessagesUseCase.execute();
  }

  async getMessageById(id: string): Promise<MessageEntity | null> {
    return await this.getMessageByIdUseCase.execute(id);
  }

  async getMessagesByEmail(email: string): Promise<MessageEntity[]> {
    return await this.getMessagesByEmailUseCase.execute(email);
  }

  async markMessageAsRead(id: string): Promise<MessageEntity> {
    return await this.markMessageAsReadUseCase.execute(id);
  }

  async deleteMessage(id: string): Promise<boolean> {
    return await this.deleteMessageUseCase.execute(id);
  }
}
