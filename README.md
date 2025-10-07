# Ahsan Javed Portfolio - Full Stack Application

A modern, responsive portfolio website built with React, TypeScript, Express.js, and Firebase. This project showcases a clean architecture with separate frontend and backend applications.

## 🏗️ Architecture

This project follows a clean architecture pattern with clear separation of concerns:

```
ahsanjaved001.io/
├── frontend/          # React + TypeScript frontend
├── backend/           # Express.js + TypeScript backend
├── firebase.json      # Firebase configuration
├── .firebaserc       # Firebase project settings
├── package.json       # Root package with workspace scripts
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 22.16.0+ 
- npm 9.0.0+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project with Functions and Hosting enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahsanjaved001/ahsanjaved001.io.git
   cd ahsanjaved001.io
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup Firebase**
   - Create a Firebase project with Functions and Hosting enabled
   - Download your Firebase service account key from Firebase Console > Project Settings > Service Accounts
   - Rename it to `firebase-service-key.json`
   - Place it in the `backend/` directory
   - Configure the `FIREBASE_SERVICE_KEY` environment variable (see Environment Variables section)

4. **Configure environment variables**
   
   **Backend Environment Setup:**
   ```bash
   # For local development
   cp backend/env.local.example backend/.env.local
   
   # For production
   cp backend/env.production.example backend/.env.production
   ```
   
   **Frontend Environment Setup:**
   ```bash
   # Copy frontend environment template
   cp frontend/env.example frontend/.env.local
   ```
   
   Edit the appropriate `.env` files with your configuration. See the [Environment Variables](#environment-variables) section below for detailed configuration.

5. **Run the setup script (optional)**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

### Development

**Start both frontend and backend in development mode:**
```bash
npm run dev
```

**Start individual services:**
```bash
# Frontend only (http://localhost:3030)
npm run dev:frontend

# Backend only (http://localhost:8085)
npm run dev:backend
```

## 📦 Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run build` | Build both frontend and backend |
| `npm run start` | Start both applications in production mode |
| `npm run lint` | Lint both applications |
| `npm run lint:fix` | Fix linting issues in both applications |
| `npm run format` | Format code in both applications |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Type check both applications |
| `npm run check-all` | Run type check, lint, and format check |
| `npm run install:all` | Install dependencies for all workspaces |
| `npm run clean` | Clean node_modules and build artifacts |
| `npm run deploy` | Deploy to Firebase |
| `npm run deploy:frontend` | Deploy only frontend to Firebase Hosting |
| `npm run deploy:backend` | Deploy only backend to Firebase Functions |

### Frontend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:frontend` | Start Vite development server |
| `npm run build:frontend` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint:frontend` | Lint frontend code |
| `npm run format:frontend` | Format frontend code |

### Backend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:backend` | Start backend with nodemon |
| `npm run build:backend` | Compile TypeScript |
| `npm run start:backend` | Start compiled backend |
| `npm run serve` | Start Firebase Functions emulator |
| `npm run deploy:backend` | Deploy to Firebase Functions |

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **PWA Support** - Progressive Web App capabilities

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Firebase Admin SDK** - Database and authentication
- **Firebase Functions** - Serverless deployment
- **Express Validator + Joi** - Data validation
- **Morgan** - HTTP request logger
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting
- **Compression** - Response compression
- **Nodemailer** - Email service

### DevOps & Deployment
- **Firebase Hosting** - Frontend hosting
- **Firebase Functions** - Backend hosting
- **Firestore** - Database
- **GitHub Actions** - CI/CD
- **Firebase CLI** - Deployment tooling

## 🏛️ Project Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/     # React components (About, Certifications, Contact, etc.)
│   ├── contexts/       # React contexts (ThemeContext)
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services (credlyService, messageService, portfolioService)
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── data/           # Static data (portfolioData.ts)
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets (favicon, robots.txt, sitemap.xml)
├── dist/               # Built application (generated)
├── package.json        # Frontend dependencies
├── vite.config.ts      # Vite configuration with PWA support
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── application/     # Application services (CertificationService, MessageService)
│   ├── domains/        # Domain entities (CertificationEntity, MessageEntity)
│   ├── infrastructure/ # External dependencies (FirebaseConfig, Repositories, External APIs)
│   ├── interfaces/     # Controllers and routes (CertificationController, MessageController)
│   ├── shared/         # Shared utilities (errors, types, utils)
│   ├── types/          # TypeScript types (credly types)
│   ├── functions.ts    # Firebase Functions entry point
│   └── index.ts        # Express server entry point
├── dist/               # Compiled JavaScript (generated)
├── package.json        # Backend dependencies
├── tsconfig.json       # TypeScript configuration
├── firebase-service-key.json # Firebase service account key (not in repo)
├── env.local.example   # Local environment template
└── env.production.example # Production environment template
```

## 🚀 Deployment

### Firebase Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init
   ```
   Select the following features:
   - Functions: Configure a Cloud Functions directory
   - Hosting: Configure files for Firebase Hosting
   - Firestore: Configure security rules and indexes

4. **Configure Firebase project**
   - Update `.firebaserc` with your project ID
   - Update `firebase.json` with your configuration
   - Set up Firestore security rules in `firestore.rules`
   - Configure Firestore indexes in `firestore.indexes.json`

5. **Environment Variables for Firebase**
   - Set up environment variables in Firebase Functions
   - Use Firebase CLI: `firebase functions:config:set`
   - Or use the new environment configuration files

## 🔧 Environment Variables

### Backend Configuration

**Local Development (`.env.local`):**
```env
# Local Development Environment Configuration
NODE_ENV=local
PORT=8085

# Frontend URL for CORS (local development)
FRONTEND_URL=http://localhost:3030

# Firebase Service Account Key (JSON format as string)
# Copy the entire JSON object from Firebase Console > Project Settings > Service Accounts
# Paste it as a single line string (escape quotes if needed)
FIREBASE_SERVICE_KEY={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

# Rate Limiting (more lenient for development)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# Email Configuration (JSON format as string)
# Gmail SMTP (FREE - 500 emails/day)
# Setup: https://support.google.com/accounts/answer/185833
# 1. Enable 2-factor authentication on your Gmail account
# 2. Generate an App Password: Google Account > Security > App passwords
# 3. Use the app password (not your regular password)
EMAIL_CONFIG={"host":"smtp.gmail.com","port":587,"secure":false,"auth":{"user":"your-email@gmail.com","pass":"your-16-char-app-password"}}

# Email address to receive notifications
NOTIFICATION_EMAIL=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

**Production (`.env.production`):**
```env
# Production Environment Configuration
NODE_ENV=production

# Frontend URL for CORS (production domain)
FRONTEND_URL=https://your-domain.com

# Rate Limiting (strict for production)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (JSON format as string)
# Gmail SMTP (FREE - 500 emails/day)
# Setup: https://support.google.com/accounts/answer/185833
# 1. Enable 2-factor authentication on your Gmail account
# 2. Generate an App Password: Google Account > Security > App passwords
# 3. Use the app password (not your regular password)
EMAIL_CONFIG={"host":"smtp.gmail.com","port":587,"secure":false,"auth":{"user":"your-email@gmail.com","pass":"your-16-char-app-password"}}

# Email address to receive notifications
NOTIFICATION_EMAIL=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com

# Logging (minimal for production)
LOG_LEVEL=error

# Security
HELMET_CSP_ENABLED=true
HELMET_HSTS_ENABLED=true
```

### Frontend Configuration

**Local Development (`.env.local`):**
```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:8085/api

# Performance optimizations
VITE_DISABLE_BACKEND_CALLS=false
```

### Configuration Setup Guide

1. **Firebase Service Account Key:**
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Copy the entire JSON object
   - Paste it as a single line string in `FIREBASE_SERVICE_KEY`

2. **Email Configuration:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account > Security > App passwords
   - Use the 16-character app password (not your regular password)
   - Configure the `EMAIL_CONFIG` JSON string with your credentials

3. **Rate Limiting:**
   - Local development: 1000 requests per 15 minutes
   - Production: 100 requests per 15 minutes

### Manual Deployment

```bash
# Deploy everything
npm run deploy

# Deploy only frontend
npm run deploy:frontend

# Deploy only backend
npm run deploy:backend
```

### Automated Deployment

The project uses GitHub Actions for automated deployment. When you push to the `main` branch:

1. Code is type-checked, linted, and formatted
2. Both frontend and backend are built
3. Applications are deployed to Firebase

## 🔐 Security

- **Helmet** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - Request throttling
- **Input Validation** - Joi validation
- **Firebase Security Rules** - Database access control


## 📝 Code Quality

### Linting
```bash
npm run lint          # Check both apps
npm run lint:fix      # Fix issues
```

### Formatting
```bash
npm run format        # Format both apps
npm run format:check  # Check formatting
```

### Type Checking
```bash
npm run type-check    # Check both apps
```

### Complete Check
```bash
npm run check-all     # Run all quality checks
```

## 🌐 API Endpoints

### Base URL
- **Development**: `http://localhost:8085`
- **Production**: `https://us-central1-ahsanjaved001-72760.cloudfunctions.net/api`

### Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/certifications` | GET | Get certifications |
| `/certifications/recent` | GET | Get recent certifications |
| `/certifications/:id` | GET | Get certification by ID |
| `/certifications/search/issuer?issuer=IBM` | GET | Get certifications by issuer |
| `/messages` | POST | Send message |
| `/messages` | GET | Get all messages |
| `/messages/:id` | GET | Get message by ID |
| `/messages/search/email?email=user@example.com` | GET | Get messages by email |
| `/messages/:id/read` | PUT | Mark message as read |
| `/messages/:id` | DELETE | Delete message |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ahsan Javed**
- Portfolio: [ahsanjaved001.io](https://ahsanjaved001.io)
- LinkedIn: [Ahsan Javed](https://linkedin.com/in/ahsanjaved001)
- GitHub: [@ahsanjaved001](https://github.com/ahsanjaved001)

## 🙏 Acknowledgments

- Firebase for hosting and functions
- React team for the amazing framework
- Vite for the fast build tool
- Tailwind CSS for the utility-first CSS framework