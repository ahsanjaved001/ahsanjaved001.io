import * as admin from 'firebase-admin';
import { AppError } from '../../shared/errors';

// Firebase configuration and initialization
export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private app: admin.app.App | null = null;

  private constructor() {}

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  public initialize(): void {
    if (this.app) {
      return; // Already initialized
    }

    try {
      const credential = this.getCredential();

      // Initialize Firebase Admin SDK
      this.app = admin.initializeApp({
        credential,
        projectId: 'ahsanjaved001-72760',
      });

      console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error);
      throw new AppError('Firebase initialization failed', 500);
    }
  }

  private getCredential(): admin.credential.Credential {
    // Check if running in Firebase Functions/Cloud Run environment
    if (this.isCloudEnvironment()) {
      console.log(
        'Using application default credentials for Firebase Functions/Cloud Run'
      );
      return admin.credential.applicationDefault();
    }

    // Try to use service account key from environment variable
    if (process.env.FIREBASE_SERVICE_KEY) {
      return this.createServiceAccountCredential();
    }

    // Fallback to application default
    console.warn(
      'No FIREBASE_SERVICE_KEY found, falling back to application default'
    );
    return admin.credential.applicationDefault();
  }

  private isCloudEnvironment(): boolean {
    return !!(process.env.FUNCTIONS_EMULATOR || process.env.K_SERVICE);
  }

  private createServiceAccountCredential(): admin.credential.Credential {
    const serviceKeyJson = process.env.FIREBASE_SERVICE_KEY;

    if (!serviceKeyJson) {
      console.warn(
        'FIREBASE_SERVICE_KEY not found, falling back to application default'
      );
      return admin.credential.applicationDefault();
    }

    try {
      const serviceKey = JSON.parse(serviceKeyJson);
      return admin.credential.cert(serviceKey);
    } catch (parseError) {
      console.error('Failed to parse FIREBASE_SERVICE_KEY JSON:', parseError);
      throw new AppError('Invalid Firebase service key format', 500);
    }
  }

  public getFirestore(): admin.firestore.Firestore {
    if (!this.app) {
      throw new AppError('Firebase not initialized', 500);
    }
    return this.app.firestore();
  }

  public getApp(): admin.app.App {
    if (!this.app) {
      throw new AppError('Firebase not initialized', 500);
    }
    return this.app;
  }
}

export const firebaseConfig = FirebaseConfig.getInstance();
