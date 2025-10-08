import { PersonalInfo, Experience, Skill } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Ahsan Javed',
  title:
    'Shopify Backend Developer | Custom Apps, Shopify Functions & Integrations',
  description:
    'Senior Software Engineer specializing in building custom Shopify apps, backend systems, and integrations that help Shopify Plus stores scale faster and run smoother. I create solutions that go beyond standard apps — building tools that improve checkout experiences, automate backend workflows, and simplify complex operations for merchants.',
  location: 'Faisalabad, Pakistan',
  currentRole: 'Senior Software Engineer',
  contact: {
    email: 'ahsanjvd001@gmail.com',
    phone: '+92 311 7150512',
    linkedin: 'https://www.linkedin.com/in/ahsanjvd001/',
    github: 'https://github.com/ahsanjaved001',
    upwork: 'https://www.upwork.com/freelancers/ahsanjaved001',
    location: 'Faisalabad, Pakistan',
  },
};

export const experiences: Experience[] = [
  {
    id: 'exp-sounds-good-agency-2023',
    company: 'Sounds Good Agency',
    title: 'Senior Software Engineer',
    location: 'Remote',
    startDate: '2023-03-01',
    endDate: null,
    description: [
      'Design and build custom Shopify apps and integrations for Shopify Plus clients, focusing on payment gateways and advanced checkout',
      'Developed and maintained payment gateway apps (GoPay, GP WebPay, BeSecure, Comgate) with secure transactions and smooth onboarding',
      'Built custom checkout extensions and Shopify Functions for personalized checkout logic',
      'Created a Pickup Points app integrating multiple carrier APIs via Shopify Functions to improve logistics',
      'Developed an AR "Fitting Box" eyewear try-on app to boost engagement and conversions',
      'Architected a Remix frontend backed by NestJS to improve performance and scalability',
      'Introduced CI/CD with GitHub Actions, reducing release time by ~50%',
      'Managed multiple stores/apps and delivered merchant-specific customizations with cross-functional collaboration',
    ],
    technologies: [
      'Shopify',
      'Shopify Plus',
      'Shopify Functions',
      'Checkout Extensions',
      'Remix',
      'NestJS',
      'TypeScript',
      'Node.js',
      'GitHub Actions',
      'Github Workflow',
      'CI/CD',
      'REST APIs',
      'AR',
    ],
  },
  {
    id: 'exp-carbonteq-senior-2022',
    company: 'Carbonteq',
    title: 'Senior Software Engineer',
    location: 'Remote',
    startDate: '2022-02-01',
    endDate: '2023-07-31',
    description: [
      'Delivered scalable, high-performance web apps across frontend and backend',
      'Built a real-time multiplayer music Bingo game using Yjs for state sync',
      'Created a reusable UI Design System with Ant Design tokens to speed delivery ~60%',
      'Built high-performance React apps using Server Components/Actions, improving load speed and engagement',
      'Led an interactive Appointment Scheduling System with drag-and-drop and resizable slots',
      'Implemented CI/CD with GitHub Actions; automated build/test/deploy and cut manual time by ~40%',
      'Optimized performance via code splitting, lazy loading, and minification (~30% load-time reduction)',
      'Owned backend services with Node.js/NestJS/PostgreSQL; REST APIs, query optimization, and security best practices',
    ],
    technologies: [
      'React',
      'Yjs',
      'Ant Design',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'TypeScript',
      'GitHub Actions',
      'Github Workflow',
      'CI/CD',
      'Performance Optimization',
    ],
  },
  {
    id: 'exp-carbonteq-se-2021',
    company: 'Carbonteq',
    title: 'Software Engineer',
    location: 'Remote',
    startDate: '2021-08-01',
    endDate: '2022-02-28',
    description: [
      'Authored OpenAPI-compliant API docs using Microsoft TypeSpec to speed onboarding and integrations',
      'Re-engineered services using Clean Architecture, removing bottlenecks and improving reliability',
      'Designed a domain-driven backend with NestJS, TypeORM, and PostgreSQL to boost scalability',
      'Migrated a legacy app to Next.js 14 App Router for better routing and performance',
      "Raised stability with refactors, added unit-testing standards, and integrated Node's native test runner",
      'Collaborated with stakeholders to align tech solutions with business goals; improved UX/UI for a health-tech platform',
    ],
    technologies: [
      'NestJS',
      'TypeORM',
      'PostgreSQL',
      'Next.js',
      'TypeScript',
      'Clean Architecture',
      'Microsoft TypeSpec',
      'Node.js Test Runner',
      'Unit Testing',
    ],
  },
  {
    id: 'exp-three-terabytes-2019',
    company: 'Three Terabytes',
    title: 'Associate Software Engineer',
    location: 'Remote',
    startDate: '2019-09-01',
    endDate: '2021-06-30',
    description: [
      'Built and maintained 10+ full-stack apps with Node.js, React, and PostgreSQL to improve operations',
      'Developed reusable React components to speed delivery across projects',
      'Designed RESTful APIs and microservices with NestJS/Express to improve reliability and scalability',
      'Optimized PostgreSQL queries and search to accelerate data retrieval',
      'Enhanced front-end performance and responsiveness with modern JS, HTML, and CSS',
      'Collaborated directly with clients and teams to ship on time',
    ],
    technologies: [
      'Node.js',
      'React',
      'PostgreSQL',
      'NestJS',
      'Express',
      'REST',
      'Microservices',
      'HTML',
      'CSS',
      'JavaScript',
    ],
  },
];

export const skills: Skill[] = [
  // Shopify Skills
  {
    id: '1',
    name: 'Shopify Apps',
    category: 'shopify',
    level: 'expert',
    icon: '🛍️',
  },
  {
    id: '2',
    name: 'Shopify Functions',
    category: 'shopify',
    level: 'expert',
    icon: '⚡',
  },
  {
    id: '3',
    name: 'Checkout Extensions',
    category: 'shopify',
    level: 'expert',
    icon: '🛒',
  },
  {
    id: '4',
    name: 'Shopify Plus',
    category: 'shopify',
    level: 'expert',
    icon: '💎',
  },
  {
    id: '5',
    name: 'Shopify APIs',
    category: 'shopify',
    level: 'expert',
    icon: '🔗',
  },
  {
    id: '6',
    name: 'Shopify Remix',
    category: 'shopify',
    level: 'expert',
    icon: '🎯',
  },
  {
    id: '7',
    name: 'Payment Gateways',
    category: 'shopify',
    level: 'expert',
    icon: '💳',
  },
  {
    id: '8',
    name: 'Webhooks',
    category: 'shopify',
    level: 'expert',
    icon: '🪝',
  },

  // Backend Skills
  {
    id: '9',
    name: 'Node.js',
    category: 'backend',
    level: 'expert',
    icon: '🟢',
  },
  {
    id: '10',
    name: 'NestJS',
    category: 'backend',
    level: 'expert',
    icon: '🔴',
  },
  {
    id: '11',
    name: 'TypeScript',
    category: 'backend',
    level: 'expert',
    icon: '🔵',
  },
  {
    id: '12',
    name: 'Express.js',
    category: 'backend',
    level: 'expert',
    icon: '⚫',
  },
  {
    id: '13',
    name: 'Prisma',
    category: 'backend',
    level: 'expert',
    icon: '🔮',
  },

  // Database Skills
  {
    id: '15',
    name: 'PostgreSQL',
    category: 'database',
    level: 'expert',
    icon: '🐘',
  },
  {
    id: '16',
    name: 'MongoDB',
    category: 'database',
    level: 'expert',
    icon: '🍃',
  },
  {
    id: '17',
    name: 'Redis',
    category: 'database',
    level: 'expert',
    icon: '🔴',
  },
  {
    id: '18',
    name: 'MySQL',
    category: 'database',
    level: 'expert',
    icon: '🐬',
  },

  // DevOps Skills
  { id: '19', name: 'Docker', category: 'devops', level: 'expert', icon: '🐳' },
  {
    id: '21',
    name: 'GitHub Actions',
    category: 'devops',
    level: 'expert',
    icon: '⚡',
  },

  // Cloud Skills
  {
    id: '24',
    name: 'AWS Lambda',
    category: 'cloud',
    level: 'expert',
    icon: 'λ',
  },
  {
    id: '25',
    name: 'Firebase',
    category: 'cloud',
    level: 'expert',
    icon: '🔥',
  },
  {
    id: '26',
    name: 'Firestore',
    category: 'database',
    level: 'expert',
    icon: '🗃️',
  },
  {
    id: '27',
    name: 'Cloud Functions',
    category: 'cloud',
    level: 'expert',
    icon: '⚡',
  },
  {
    id: '28',
    name: 'Cloud Run',
    category: 'cloud',
    level: 'expert',
    icon: '🏃',
  },
  {
    id: '29',
    name: 'Cloud Storage',
    category: 'cloud',
    level: 'expert',
    icon: '🪣',
  },

  // Tools & Architecture
  {
    id: '30',
    name: 'Microservices',
    category: 'tools',
    level: 'expert',
    icon: '🏗️',
  },
  {
    id: '31',
    name: 'RESTful APIs',
    category: 'tools',
    level: 'expert',
    icon: '🌐',
  },
  {
    id: '32',
    name: 'GraphQL',
    category: 'tools',
    level: 'expert',
    icon: '📊',
  },
  { id: '33', name: 'JWT', category: 'tools', level: 'expert', icon: '🔐' },
  {
    id: '34',
    name: 'WebSocket',
    category: 'tools',
    level: 'intermediate',
    icon: '🔌',
  },
  { id: '35', name: 'Git', category: 'tools', level: 'expert', icon: '📝' },
  {
    id: '36',
    name: 'AR/VR',
    category: 'tools',
    level: 'intermediate',
    icon: '🥽',
  },
];

export const skillCategories = [
  { id: 'all', name: 'All Skills', icon: '🎯', count: skills.length },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: '🛍️',
    count: skills.filter(s => s.category === 'shopify').length,
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '⚡',
    count: skills.filter(s => s.category === 'backend').length,
  },
  {
    id: 'database',
    name: 'Database',
    icon: '🗄️',
    count: skills.filter(s => s.category === 'database').length,
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: '🚀',
    count: skills.filter(s => s.category === 'devops').length,
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: '☁️',
    count: skills.filter(s => s.category === 'cloud').length,
  },
  {
    id: 'tools',
    name: 'Tools & Architecture',
    icon: '🔧',
    count: skills.filter(s => s.category === 'tools').length,
  },
];

// Helper functions
export const getSkillsByCategory = (category: string): Skill[] => {
  if (category === 'all') return skills;
  return skills.filter(skill => skill.category === category);
};

export const getSkillsByLevel = (level: string): Skill[] => {
  return skills.filter(skill => skill.level === level);
};

export const getTopSkills = (limit: number = 10): Skill[] => {
  return skills.filter(skill => skill.level === 'expert').slice(0, limit);
};

// Total experience metadata
export const totalExperience = {
  months: 73,
  humanReadable: '6 years 1 month',
  asOf: '2025-01-07',
};

export const calculateTotalExperienceYears = (): number => {
  // Find the earliest start date from all experiences
  const earliestStartDate = new Date(
    Math.min(...experiences.map(exp => new Date(exp.startDate).getTime()))
  );

  // Use current date as end date
  const currentDate = new Date();

  const diffTime = Math.abs(
    currentDate.getTime() - earliestStartDate.getTime()
  );
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
};

export const getCurrentExperience = (): Experience | null => {
  return experiences.find(exp => exp.endDate === null) || null;
};
