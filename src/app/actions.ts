// @ts-nocheck
'use server';

import { z } from 'zod';
import { smartPeerMatching } from '@/ai/flows/smart-peer-matching';
import { getPersonalizedGrowthSuggestions } from '@/ai/flows/personalized-growth-suggestions';
import { digitalGrowthAdvisor } from '@/ai/flows/digital-growth-advisor';
import type { 
  NewStudentProfile, 
  SmartPeerMatchingOutput, 
  PersonalizedGrowthSuggestionsOutput, 
  DigitalGrowthAdvisorOutput,
  DigitalGrowthAdvisorInput,
  PersonalizedGrowthSuggestionsInput
} from '@/lib/types';
import { seniorMentors } from '@/lib/data';

const findMentorsSchema = z.object({
  major: z.string().min(1, { message: "专业不能为空" }),
  academicInterests: z.string().min(1, { message: "学术兴趣不能为空" }),
  hobbies: z.string().min(1, { message: "爱好不能为空" }),
  goals: z.string().min(1, { message: "目标不能为空" }),
});

type FindMentorsState = {
  success: boolean;
  data?: SmartPeerMatchingOutput;
  errors?: z.ZodError<typeof findMentorsSchema>['formErrors']['fieldErrors'];
  message?: string;
};

export async function findMentorsAction(prevState: FindMentorsState, formData: FormData): Promise<FindMentorsState> {
  const validatedFields = findMentorsSchema.safeParse({
    major: formData.get('major'),
    academicInterests: formData.get('academicInterests'),
    hobbies: formData.get('hobbies'),
    goals: formData.get('goals'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { major, academicInterests, hobbies, goals } = validatedFields.data;

  const newStudent: NewStudentProfile = {
    name: '新生', // Placeholder name
    major,
    academicInterests: academicInterests.split(/[,，、\s]+/).filter(Boolean),
    hobbies: hobbies.split(/[,，、\s]+/).filter(Boolean),
    goals,
  };

  try {
    const result = await smartPeerMatching({
      newStudent,
      seniorMentors,
    });
    return { success: true, data: result };
  } catch (e) {
    console.error("AI matching failed:", e);
    return { success: false, message: "AI匹配失败，请稍后再试。" };
  }
}

const getGrowthPlanSchema = z.object({
  studentProfileDescription: z.string().min(20, { message: "档案描述需要更详细一些" }),
});

type GrowthPlanState = {
  success: boolean;
  data?: {
    growthSuggestions: PersonalizedGrowthSuggestionsOutput;
    growthAdvisor: DigitalGrowthAdvisorOutput;
  };
  errors?: z.ZodError<typeof getGrowthPlanSchema>['formErrors']['fieldErrors'];
  message?: string;
}

export async function getGrowthPlanAction(prevState: GrowthPlanState, formData: FormData): Promise<GrowthPlanState> {
  const validatedFields = getGrowthPlanSchema.safeParse({
    studentProfileDescription: formData.get('studentProfileDescription'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { studentProfileDescription } = validatedFields.data;

  const historicalDataContext = "Historical data shows that CS majors with AI interests often succeed in data science roles if they take advanced statistics. Students struggling with math in early years often benefit from peer tutoring.";
  
  const growthAdvisorInput: DigitalGrowthAdvisorInput = {
    studentProfileDescription,
    historicalDataContext,
  };

  // Crude parsing for personalized suggestions. A more robust solution would be better.
  const academicProgress = studentProfileDescription.match(/GPA:\s*([0-9.]+)/)?.[1] || "N/A";
  const interests = studentProfileDescription.match(/Interests:\s*(.*?)\./)?.[1]?.split(', ') || [];
  
  const growthSuggestionsInput: PersonalizedGrowthSuggestionsInput = {
    academicProgress: `GPA: ${academicProgress}`,
    engagementActivities: ["Hackathons", "Coding clubs"],
    interests,
  };

  try {
    const [growthAdvisor, growthSuggestions] = await Promise.all([
      digitalGrowthAdvisor(growthAdvisorInput),
      getPersonalizedGrowthSuggestions(growthSuggestionsInput),
    ]);
    return { success: true, data: { growthAdvisor, growthSuggestions } };
  } catch (e) {
    console.error("AI growth plan generation failed:", e);
    return { success: false, message: "AI 规划生成失败，请稍后再试。" };
  }
}
