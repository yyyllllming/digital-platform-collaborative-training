export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | undefined;
  major: string;
  grade: string;
  interests: string[];
  skills: string[];
};

export type CommunityPost = {
  id: string;
  author: string;
  authorId: string;
  authorAvatar: string | undefined;
  title: string;
  content: string;
  tags: string[];
  timestamp: string; // ISO 8601 format
  likes: number;
  commentsCount: number;
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

export type {
  DigitalGrowthAdvisorInput,
  DigitalGrowthAdvisorOutput
} from '@/ai/flows/digital-growth-advisor';
