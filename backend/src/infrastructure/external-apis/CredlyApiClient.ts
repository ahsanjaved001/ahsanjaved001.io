import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ExternalServiceError } from '../../shared/errors';
import { CredlyBadge, CredlyResponse } from '@/types';

export class CredlyApiClient {
  private client: AxiosInstance;
  private readonly userId: string;

  constructor(userId: string = 'ahsanjaved001') {
    this.userId = userId;
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error(
          'Credly API Error:',
          error.response?.data || error.message
        );
        throw new ExternalServiceError(
          `Credly API error: ${error.response?.data?.message || error.message}`
        );
      }
    );
  }

  async getBadges(): Promise<CredlyResponse> {
    try {
      // Use the public API endpoint - no authentication required
      const url = `https://www.credly.com/users/${this.userId}/badges.json`;

      const response: AxiosResponse<CredlyResponse> =
        await this.client.get(url);

      return response.data;
    } catch (error) {
      console.error('Failed to fetch badges from Credly:', error);
      throw new ExternalServiceError(
        'Failed to fetch certifications from Credly API'
      );
    }
  }

  async getBadgeById(badgeId: string): Promise<CredlyBadge> {
    try {
      // For individual badge, we'll need to fetch all badges and filter
      // since the public API doesn't support individual badge lookup
      const response = await this.getBadges();
      const badge = response.data.find(b => b.id === badgeId);

      if (!badge) {
        throw new ExternalServiceError(`Badge with ID ${badgeId} not found`);
      }

      return badge;
    } catch (error) {
      console.error('Failed to fetch badge by ID from Credly:', error);
      throw new ExternalServiceError(
        'Failed to fetch certification details from Credly API'
      );
    }
  }
}

export const credlyApiClient = new CredlyApiClient();
