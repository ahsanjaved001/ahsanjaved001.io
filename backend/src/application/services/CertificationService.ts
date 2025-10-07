import {
  CertificationEntity,
  ICertificationRepository,
} from '../../domains/certification/entities/CertificationEntity';
import { CredlyCertificationRepository } from '../../infrastructure/database/CredlyCertificationRepository';

// Use Cases for Certification Domain
export class GetCertificationsUseCase {
  constructor(private certificationRepository: ICertificationRepository) {}

  async execute(): Promise<CertificationEntity[]> {
    return await this.certificationRepository.findAll();
  }
}

export class GetCertificationByIdUseCase {
  constructor(private certificationRepository: ICertificationRepository) {}

  async execute(id: string): Promise<CertificationEntity | null> {
    return await this.certificationRepository.findById(id);
  }
}

export class GetCertificationsByIssuerUseCase {
  constructor(private certificationRepository: ICertificationRepository) {}

  async execute(issuer: string): Promise<CertificationEntity[]> {
    return await this.certificationRepository.findByIssuer(issuer);
  }
}

export class GetRecentCertificationsUseCase {
  constructor(private certificationRepository: ICertificationRepository) {}

  async execute(): Promise<CertificationEntity[]> {
    return await this.certificationRepository.findRecent();
  }
}

// Service Layer
export class CertificationService {
  private getCertificationsUseCase: GetCertificationsUseCase;
  private getCertificationByIdUseCase: GetCertificationByIdUseCase;
  private getCertificationsByIssuerUseCase: GetCertificationsByIssuerUseCase;
  private getRecentCertificationsUseCase: GetRecentCertificationsUseCase;

  constructor() {
    const repository = new CredlyCertificationRepository();
    this.getCertificationsUseCase = new GetCertificationsUseCase(repository);
    this.getCertificationByIdUseCase = new GetCertificationByIdUseCase(
      repository
    );
    this.getCertificationsByIssuerUseCase =
      new GetCertificationsByIssuerUseCase(repository);
    this.getRecentCertificationsUseCase = new GetRecentCertificationsUseCase(
      repository
    );
  }

  async getAllCertifications(): Promise<CertificationEntity[]> {
    return await this.getCertificationsUseCase.execute();
  }

  async getCertificationById(id: string): Promise<CertificationEntity | null> {
    return await this.getCertificationByIdUseCase.execute(id);
  }

  async getCertificationsByIssuer(
    issuer: string
  ): Promise<CertificationEntity[]> {
    return await this.getCertificationsByIssuerUseCase.execute(issuer);
  }

  async getRecentCertifications(): Promise<CertificationEntity[]> {
    return await this.getRecentCertificationsUseCase.execute();
  }
}
