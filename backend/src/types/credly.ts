// Credly API Types - Updated to match the actual API response structure

export interface CredlySkill {
  id: string;
  name: string;
  vanity_slug: string;
  canonical: boolean;
  faethm_id?: string;
}

export interface CredlyIssuerEntity {
  type: string;
  id: string;
  name: string;
  url: string;
  vanity_url: string;
  internationalize_badge_templates: boolean;
  share_to_ziprecruiter: boolean;
  twitter_url: string;
  verified: boolean;
}

export interface CredlyIssuer {
  summary: string;
  entities: Array<{
    label: string;
    primary: boolean;
    entity: CredlyIssuerEntity;
  }>;
}

export interface CredlyBadgeTemplate {
  id: string;
  description: string;
  global_activity_url?: string;
  earn_this_badge_url?: string;
  enable_earn_this_badge: boolean;
  enable_detail_attribute_visibility: boolean;
  job_board_url?: string;
  name: string;
  public: boolean;
  recipient_type: string;
  vanity_slug: string;
  show_badge_lmi: boolean;
  show_skill_tag_links: boolean;
  settings_enable_related_badges: boolean;
  translatable: boolean;
  level: string;
  time_to_earn: string;
  cost: string;
  type_category: string;
  language: string;
  image: {
    id: string;
    url: string;
  };
  image_url: string;
  url: string;
  owner_vanity_slug: string;
  badge_template_earnable: boolean;
  recommendable: boolean;
  issuer: CredlyIssuer;
  related_badge_templates: Array<{
    id: string;
    name: string;
    image: {
      id: string;
      url: string;
    };
    image_url: string;
    updated_at: string;
    url: string;
  }>;
  alignments: any[];
  badge_template_activities: Array<{
    id: string;
    activity_type: string;
    required_badge_template_id?: string;
    title: string;
    url?: string;
  }>;
  endorsements: any[];
  skills: CredlySkill[];
}

export interface CredlyBadge {
  id: string;
  expires_at_date: string;
  issued_at_date: string;
  issued_to: string;
  locale: string;
  public: boolean;
  state: string;
  translate_metadata: boolean;
  accepted_at: string;
  expires_at: string;
  issued_at: string;
  last_updated_at: string;
  updated_at: string;
  earner_path: string;
  earner_photo_url: string;
  is_private_badge: boolean;
  user_is_earner: boolean;
  printable: boolean;
  language: string;
  issuer: CredlyIssuer;
  badge_template: CredlyBadgeTemplate;
  image: {
    id: string;
    url: string;
  };
  image_url: string;
  evidence: any[];
  recommendations: any[];
}

export interface CredlyResponse {
  data: CredlyBadge[];
  metadata: {
    count: number;
    current_page: number;
    total_count: number;
    total_pages: number;
    per: number;
    previous_page_url?: string;
    next_page_url?: string;
  };
}
