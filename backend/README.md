# Ahsan Javed Portfolio Backend API

A robust backend API built with TypeScript, Express, and Firebase Firestore, following Domain-Driven Design (DDD) principles.

## 🏗️ Architecture

This backend follows Domain-Driven Design principles with clean architecture:

```
src/
├── domains/                 # Domain Layer
│   ├── certification/       # Certification domain
│   └── message/            # Message domain
├── infrastructure/         # Infrastructure Layer
│   ├── config/            # Configuration
│   ├── database/          # Repository implementations
│   └── external-apis/     # External API clients
├── application/           # Application Layer
│   └── services/          # Use cases and services
├── interfaces/            # Interface Layer
│   ├── controllers/       # HTTP controllers
│   ├── middleware/         # Express middleware
│   └── routes/           # Route definitions
└── shared/               # Shared utilities
    ├── types/           # TypeScript types
    ├── errors/          # Custom error classes
    └── utils/           # Utility functions
```

## 🚀 Features

- **Certification Management**: Fetch certifications from Credly API
- **Message System**: Store and manage contact messages in Firebase Firestore
- **Rate Limiting**: Protect against abuse
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling with custom error classes
- **Security**: Helmet, CORS, and other security middleware
- **Logging**: Request logging with Morgan
- **Environment Management**: Cross-platform environment variable management with cross-env

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **External APIs**: Credly API
- **Validation**: Express Validator + Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Compression**: Response compression
- **Email**: Nodemailer for email notifications

## 📦 Installation

1. **Clone and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   For **local development**:
   ```bash
   cp env.local.example .env.local
   ```
   
   For **production**:
   ```bash
   cp env.production.example .env.production
   ```
   
   For **general development** (fallback):
   ```bash
   cp env.local.example .env
   ```
   
   Update the appropriate `.env` file with your actual values:
   - Firebase service account credentials
   - Credly API token (optional)
   - Frontend URL for CORS
   - Rate limiting configuration

4. **Build the project**:
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`ahsanjaved001-72760`)
3. Go to Project Settings > Service Accounts
4. Generate a new private key
5. Add the credentials to your `.env` file

### Credly API (Optional)

1. Register at [Credly Developer Portal](https://credly.com/developers)
2. Get your API token
3. Add it to your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This runs the server in development mode with `NODE_ENV=local` and loads `.env.local` file.

### Local Development Mode
```bash
npm run start:local
```
This runs the server in local mode with `NODE_ENV=local` and loads `.env.local` file.

### Production Mode
```bash
npm run build
npm start
```
This builds the TypeScript code and runs the server in production mode with `NODE_ENV=production` and loads `.env.production` file.

The API will be available at `http://localhost:8085`

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### Certifications
- `GET /certifications` - Get all certifications
- `GET /certifications/recent` - Get recent certifications
- `GET /certifications/:id` - Get certification by ID
- `GET /certifications/search/issuer?issuer=IBM` - Get certifications by issuer

### Messages
- `POST /messages` - Create a new message
- `GET /messages` - Get all messages
- `GET /messages/:id` - Get message by ID
- `GET /messages/search/email?email=user@example.com` - Get messages by email
- `PUT /messages/:id/read` - Mark message as read
- `DELETE /messages/:id` - Delete message

## 📝 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Error description"
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: No sensitive information leaked in errors


## 📊 Monitoring

The API includes:
- Request logging with Morgan
- Error logging
- Health check endpoint
- Rate limiting metrics

## 🚀 Deployment

### Environment Variables for Production

```bash
NODE_ENV=production
PORT=8085
FRONTEND_URL=https://your-frontend-domain.com
# ... Firebase and other credentials
```


## 🤝 Contributing

1. Follow the existing code structure and DDD principles
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## 📄 License

MIT License
