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
