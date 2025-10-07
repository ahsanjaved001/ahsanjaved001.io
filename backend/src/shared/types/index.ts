// Shared types for the entire application
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'backend' | 'frontend' | 'devops' | 'database' | 'tools' | 'cloud';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  location: string;
  currentRole: string;
  contact: ContactInfo;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  location: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface CreateMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
