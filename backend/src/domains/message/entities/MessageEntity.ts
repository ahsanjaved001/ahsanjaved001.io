import { Message } from '../../../shared/types';

// Domain Entity for Message
export class MessageEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly subject: string,
    public readonly message: string,
    public readonly createdAt: Date,
    public readonly isRead: boolean = false
  ) {}

  // Domain logic methods
  public markAsRead(): MessageEntity {
    return new MessageEntity(
      this.id,
      this.name,
      this.email,
      this.subject,
      this.message,
      this.createdAt,
      true
    );
  }

  public isRecent(): boolean {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    return this.createdAt > oneHourAgo;
  }

  public getFormattedCreatedAt(): string {
    return this.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  public toDTO(): Message {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      createdAt: this.createdAt,
      isRead: this.isRead,
    };
  }
}

// Repository Interface (Domain Layer)
export interface IMessageRepository {
  create(
    message: Omit<Message, 'id' | 'createdAt' | 'isRead'>
  ): Promise<MessageEntity>;
  findAll(): Promise<MessageEntity[]>;
  findById(id: string): Promise<MessageEntity | null>;
  findByEmail(email: string): Promise<MessageEntity[]>;
  markAsRead(id: string): Promise<MessageEntity | null>;
  delete(id: string): Promise<boolean>;
}
