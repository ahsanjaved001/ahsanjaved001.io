import axios from 'axios';
import { Certification } from '../types';

// Backend API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class CredlyService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Fetch certifications from backend API
   */
  async getCertifications(): Promise<Certification[]> {
    try {
      console.log(
        '🔍 Fetching certifications from:',
        `${this.baseURL}/certifications`
      );

      const response = await axios.get<ApiResponse<Certification[]>>(
        `${this.baseURL}/certifications`
      );

      console.log('📊 API Response:', response.data);

      if (!response.data.success) {
        throw new Error(
          response.data.error || 'Failed to fetch certifications'
        );
      }

      const certifications = response.data.data || [];
      console.log('✅ Certifications loaded:', certifications.length, 'items');

      return certifications;
    } catch (error) {
      console.error('❌ Error fetching certifications:', error);
      throw new Error('Failed to fetch certifications');
    }
  }
}

export const credlyService = new CredlyService();
