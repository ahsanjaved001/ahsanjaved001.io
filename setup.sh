#!/bin/bash

# Ahsan Javed Portfolio - Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Ahsan Javed Portfolio Development Environment"
echo "=========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "⚠️  Firebase CLI is not installed. Installing globally..."
    npm install -g firebase-tools
fi

echo "✅ Firebase CLI $(firebase --version) detected"

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env file..."
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env from template"
    echo "⚠️  Please edit backend/.env with your configuration"
fi

# Check if Firebase service key exists
if [ ! -f "backend/firebase-service-key.json" ]; then
    echo "⚠️  Firebase service key not found at backend/firebase-service-key.json"
    echo "📋 Please download your Firebase service account key from:"
    echo "   Firebase Console > Project Settings > Service Accounts"
    echo "   Rename it to 'firebase-service-key.json' and place it in backend/ directory"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Download Firebase service account key and place it in backend/firebase-service-key.json"
echo "2. Edit backend/.env with your configuration"
echo "3. Run 'npm run dev' to start development servers"
echo "4. Run 'npm run check-all' to verify everything is working"
echo ""
echo "🔗 Useful commands:"
echo "  npm run dev          # Start both frontend and backend"
echo "  npm run build        # Build both applications"
echo "  npm run deploy       # Deploy to Firebase"
echo "  npm run check-all    # Run all quality checks"
