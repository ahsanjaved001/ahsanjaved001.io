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
  duration?: string;
  isCurrent?: boolean;
}

// Updated Skill interface to include shopify category
export interface Skill {
  id: string;
  name: string;
  category:
    | 'backend'
    | 'frontend'
    | 'devops'
    | 'database'
    | 'tools'
    | 'cloud'
    | 'shopify';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  location: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  location: string;
  currentRole: string;
  contact: ContactInfo;
}
