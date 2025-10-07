import { Experience, Certification, Skill, PersonalInfo } from '@/types';
import {
  personalInfo,
  experiences,
  skills,
  skillCategories,
  getSkillsByCategory,
} from '@/data/portfolioData';
import { credlyService } from './credlyService';

/**
 * Service Layer Implementation
 * Business logic layer for portfolio operations
 */
export class PortfolioService {
  /**
   * Get personal information with formatting
   */
  public async getPersonalInfo(): Promise<PersonalInfo> {
    return personalInfo;
  }

  /**
   * Get experiences with additional processing
   */
  public async getExperiences(): Promise<Experience[]> {
    return experiences.map(exp => ({
      ...exp,
      duration: this.calculateDuration(exp.startDate, exp.endDate),
      isCurrent: exp.endDate === null,
    }));
  }

  /**
   * Get certifications from backend (for admin or when explicitly needed)
   */
  public async getCertificationsFromBackend(): Promise<Certification[]> {
    try {
      const certifications = await credlyService.getCertifications();
      return certifications.sort(
        (a, b) =>
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      );
    } catch (error) {
      console.error('Error fetching certifications:', error);
      return [];
    }
  }

  /**
   * Get skills by category
   */
  public async getSkillsByCategory(category?: string): Promise<Skill[]> {
    if (!category) return skills;
    return getSkillsByCategory(category);
  }

  /**
   * Get skill categories
   */
  public async getSkillCategories(): Promise<
    Array<{
      id: string;
      name: string;
      icon: string;
      count: number;
    }>
  > {
    return skillCategories;
  }

  /**
   * Calculate duration between dates
   */
  private calculateDuration(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return months > 0 ? `${years}y ${months}m` : `${years}y`;
    }
    return `${months}m`;
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService();
