import { Request, Response, NextFunction } from 'express';
import { CertificationService } from '../../application/services/CertificationService';
import { ApiResponse } from '../../shared/types';
import { AppError } from '../../shared/errors';

export class CertificationController {
  private certificationService: CertificationService;

  constructor() {
    this.certificationService = new CertificationService();
  }

  getAllCertifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const certifications =
        await this.certificationService.getAllCertifications();
      const response: ApiResponse = {
        success: true,
        data: certifications.map(cert => cert.toDTO()),
        message: 'Certifications retrieved successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCertificationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new AppError('Certification ID is required', 400);
      }

      const certification =
        await this.certificationService.getCertificationById(id);

      if (!certification) {
        throw new AppError('Certification not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        data: certification.toDTO(),
        message: 'Certification retrieved successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCertificationsByIssuer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { issuer } = req.query;

      if (!issuer || typeof issuer !== 'string') {
        throw new AppError('Issuer parameter is required', 400);
      }

      const certifications =
        await this.certificationService.getCertificationsByIssuer(issuer);
      const response: ApiResponse = {
        success: true,
        data: certifications.map(cert => cert.toDTO()),
        message: `Certifications by ${issuer} retrieved successfully`,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getRecentCertifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const certifications =
        await this.certificationService.getRecentCertifications();
      const response: ApiResponse = {
        success: true,
        data: certifications.map(cert => cert.toDTO()),
        message: 'Recent certifications retrieved successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
