import { credlyApiClient } from '../../infrastructure/external-apis/CredlyApiClient';
import { CredlyBadge } from '@/types';
import {
  CertificationEntity,
  ICertificationRepository,
} from '../../domains/certification/entities/CertificationEntity';
import { ExternalServiceError } from '../../shared/errors';

export class CredlyCertificationRepository implements ICertificationRepository {
  async findAll(): Promise<CertificationEntity[]> {
    try {
      const response = await credlyApiClient.getBadges();
      return response.data.map(badge => this.mapCredlyBadgeToEntity(badge));
    } catch (error) {
      console.error('Error fetching certifications from Credly:', error);
      // Fallback to mock data if Credly API fails
      return this.getMockCertifications();
    }
  }

  async findById(id: string): Promise<CertificationEntity | null> {
    try {
      const badge = await credlyApiClient.getBadgeById(id);
      return this.mapCredlyBadgeToEntity(badge);
    } catch (error) {
      console.error('Error fetching certification by ID from Credly:', error);
      // Fallback to mock data
      const mockCertifications = this.getMockCertifications();
      return mockCertifications.find(cert => cert.id === id) || null;
    }
  }

  async findByIssuer(issuer: string): Promise<CertificationEntity[]> {
    try {
      const certifications = await this.findAll();
      return certifications.filter(cert =>
        cert.issuer.toLowerCase().includes(issuer.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching certifications by issuer:', error);
      throw new ExternalServiceError(
        'Failed to fetch certifications by issuer'
      );
    }
  }

  async findRecent(): Promise<CertificationEntity[]> {
    try {
      const certifications = await this.findAll();
      return certifications.filter(cert => cert.isRecent());
    } catch (error) {
      console.error('Error fetching recent certifications:', error);
      throw new ExternalServiceError('Failed to fetch recent certifications');
    }
  }

  private mapCredlyBadgeToEntity(badge: CredlyBadge): CertificationEntity {
    // Extract issuer name from the nested structure
    const issuerName =
      badge.issuer.entities.find(entity => entity.primary)?.entity.name ||
      badge.issuer.entities[0]?.entity.name ||
      'Unknown Issuer';

    return new CertificationEntity(
      badge.id,
      badge.badge_template.name,
      issuerName,
      badge.issued_at_date,
      badge.badge_template.url,
      badge.image_url,
      badge.badge_template.description || undefined
    );
  }

  private getMockCertifications(): CertificationEntity[] {
    return [
      new CertificationEntity(
        'aws-cloud-practitioner',
        'AWS Certified Cloud Practitioner',
        'Amazon Web Services (AWS)',
        '2023-01-01',
        'https://www.credly.com/badges/7587174c-d146-4aec-bab6-6576917e95f7/public_url',
        'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
        'Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.'
      ),
      new CertificationEntity(
        'docker-essentials',
        'Docker Essentials: A Developer Introduction',
        'IBM',
        '2023-01-01',
        'https://www.credly.com/badges/5ed09f31-ebcc-4e96-bb24-bda8ed1533b3/public_url',
        'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
        'Comprehensive understanding of Docker containerization, including container lifecycle, networking, and orchestration.'
      ),
      new CertificationEntity(
        'github-actions',
        'GitHub Actions',
        'GitHub',
        '2023-01-01',
        'https://www.credly.com/badges/b7ad8a05-c5a3-4b28-b53a-4ce67c914a72/public_url',
        'https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
        'Expertise in GitHub Actions for CI/CD, automation workflows, and DevOps practices.'
      ),
      new CertificationEntity(
        'nodejs-development',
        'Node.js Application Development',
        'IBM',
        '2023-01-01',
        'https://www.credly.com/badges/18a67916-2e04-49d0-8292-da0ea16974c5/public_url',
        'https://images.credly.com/size/340x340/images/85b9cfc4-257a-4742-878c-4f7ab4a2631b/image.png',
        'Advanced skills in Node.js application development, including asynchronous programming, modules, and best practices.'
      ),
    ];
  }
}
