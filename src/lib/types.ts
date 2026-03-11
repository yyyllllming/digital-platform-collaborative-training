export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | undefined;
  major: string;
  grade: string;
  role: 'freshman' | 'senior';
  interests: string[];
  skills: string[];
  supportNeeds: string[];
  canSupportWith: string[];
  motivation: string;
};

export type CommunityPost = {
  id: string;
  author: string;
  authorId: string;
  authorAvatar: string | undefined;
  title: string;
  content: string;
  tags: string[];
  postType: 'ask_help' | 'share_experience' | 'recruit_partner' | 'activity_notice';
  audience: 'all' | 'freshman' | 'senior';
  timestamp: string;
  likes: number;
  commentsCount: number;
};

export type ResourceItem = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string | undefined;
  description: string;
  image: string | undefined;
  tags: string[];
  downloadUrl: string;
  category: string;
  audience: 'all' | 'freshman' | 'senior';
  mentorValue: string;
  freshmanValue: string;
};

export type {
  PersonalizedGrowthSuggestionsInput,
  PersonalizedGrowthSuggestionsOutput
} from '@/ai/flows/personalized-growth-suggestions';

export type {
  SmartPeerMatchingInput,
  SmartPeerMatchingOutput,
  NewStudentProfile,
  SeniorMentorProfile
} from '@/ai/flows/smart-peer-matching';

export type MentorProfile = import('@/ai/flows/smart-peer-matching').SeniorMentorProfile & {
  supportAreas: string[];
  mentorBenefits: string[];
  style: string;
};

export type {
  DigitalGrowthAdvisorInput,
  DigitalGrowthAdvisorOutput
} from '@/ai/flows/digital-growth-advisor';
