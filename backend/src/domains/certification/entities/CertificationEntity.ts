import { Certification } from '../../../shared/types';

// Domain Entity for Certification
export class CertificationEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly issuer: string,
    public readonly issueDate: string,
    public readonly credentialUrl: string,
    public readonly imageUrl: string,
    public readonly description?: string
  ) {}

  // Domain logic methods
  public isRecent(): boolean {
    const issueDate = new Date(this.issueDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return issueDate > oneYearAgo;
  }

  public getFormattedIssueDate(): string {
    return new Date(this.issueDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  public toDTO(): Certification {
    const dto: Certification = {
      id: this.id,
      title: this.title,
      issuer: this.issuer,
      issueDate: this.issueDate,
      credentialUrl: this.credentialUrl,
      imageUrl: this.imageUrl,
    };

    if (this.description !== undefined) {
      dto.description = this.description;
    }

    return dto;
  }
}

// Repository Interface (Domain Layer)
export interface ICertificationRepository {
  findAll(): Promise<CertificationEntity[]>;
  findById(id: string): Promise<CertificationEntity | null>;
  findByIssuer(issuer: string): Promise<CertificationEntity[]>;
  findRecent(): Promise<CertificationEntity[]>;
}
