import { Router } from 'express';
import { CertificationController } from '../controllers/CertificationController';
import { asyncHandler } from '../middleware/errorHandler';
import { validateQuery } from '../middleware/validation';

const router = Router();
const certificationController = new CertificationController();

// GET /certifications - Get all certifications
router.get('/', asyncHandler(certificationController.getAllCertifications));

// GET /certifications/recent - Get recent certifications
router.get(
  '/recent',
  asyncHandler(certificationController.getRecentCertifications)
);

// GET /certifications/:id - Get certification by ID
router.get('/:id', asyncHandler(certificationController.getCertificationById));

// GET /certifications/search/issuer?issuer=IBM - Get certifications by issuer
router.get(
  '/search/issuer',
  validateQuery(['issuer']),
  asyncHandler(certificationController.getCertificationsByIssuer)
);

export default router;
