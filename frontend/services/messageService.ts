import axios from 'axios';

// Backend API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api';

export interface CreateMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class MessageService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Send a message through the contact form
   */
  async sendMessage(messageData: CreateMessageRequest): Promise<Message> {
    try {
      const response = await axios.post<ApiResponse<Message>>(
        `${this.baseURL}/messages`,
        messageData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to send message');
      }

      return response.data.data!;
    } catch (error) {
      console.error('Error sending message:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error('Failed to send message. Please try again.');
    }
  }

  /**
   * Get all messages (admin function)
   */
  async getAllMessages(): Promise<Message[]> {
    try {
      const response = await axios.get<ApiResponse<Message[]>>(
        `${this.baseURL}/messages`
      );

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch messages');
      }

      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  /**
   * Get message by ID (admin function)
   */
  async getMessageById(id: string): Promise<Message | null> {
    try {
      const response = await axios.get<ApiResponse<Message>>(
        `${this.baseURL}/messages/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch message');
      }

      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching message by ID:', error);
      throw new Error('Failed to fetch message');
    }
  }

  /**
   * Get messages by email (admin function)
   */
  async getMessagesByEmail(email: string): Promise<Message[]> {
    try {
      const response = await axios.get<ApiResponse<Message[]>>(
        `${this.baseURL}/messages/search/email`,
        {
          params: { email },
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error || 'Failed to fetch messages by email'
        );
      }

      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching messages by email:', error);
      throw new Error('Failed to fetch messages by email');
    }
  }

  /**
   * Mark message as read (admin function)
   */
  async markMessageAsRead(id: string): Promise<Message> {
    try {
      const response = await axios.put<ApiResponse<Message>>(
        `${this.baseURL}/messages/${id}/read`
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error || 'Failed to mark message as read'
        );
      }

      return response.data.data!;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  /**
   * Delete message (admin function)
   */
  async deleteMessage(id: string): Promise<boolean> {
    try {
      const response = await axios.delete<ApiResponse>(
        `${this.baseURL}/messages/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete message');
      }

      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }
}

export const messageService = new MessageService();
