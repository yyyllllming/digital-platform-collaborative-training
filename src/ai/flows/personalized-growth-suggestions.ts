'use server';
/**
 * @fileOverview A Genkit flow for generating personalized growth suggestions for students.
 *
 * - getPersonalizedGrowthSuggestions - A function that generates personalized recommendations.
 * - PersonalizedGrowthSuggestionsInput - The input type for the getPersonalizedGrowthSuggestions function.
 * - PersonalizedGrowthSuggestionsOutput - The return type for the getPersonalizedGrowthSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGrowthSuggestionsInputSchema = z.object({
  academicProgress: z.string().describe('Summary of the student\'s academic performance and grades.'),
  engagementActivities: z.array(z.string()).describe('List of extracurricular activities, clubs, or projects the student is involved in.'),
  interests: z.array(z.string()).describe('List of the student\'s stated interests and career aspirations.'),
});
export type PersonalizedGrowthSuggestionsInput = z.infer<typeof PersonalizedGrowthSuggestionsInputSchema>;

const RecommendationItemSchema = z.object({
  name: z.string().describe('The name of the recommendation (e.g., course title, activity name).'),
  description: z.string().describe('A brief description of the recommendation and why it is suitable.'),
});

const PersonalizedGrowthSuggestionsOutputSchema = z.object({
  courseRecommendations: z.array(RecommendationItemSchema).describe('Recommended courses for the student.'),
  extracurricularRecommendations: z.array(RecommendationItemSchema).describe('Recommended extracurricular activities or clubs.'),
  skillDevelopmentRecommendations: z.array(RecommendationItemSchema).describe('Recommended skill development tasks or workshops.'),
});
export type PersonalizedGrowthSuggestionsOutput = z.infer<typeof PersonalizedGrowthSuggestionsOutputSchema>;

export async function getPersonalizedGrowthSuggestions(input: PersonalizedGrowthSuggestionsInput): Promise<PersonalizedGrowthSuggestionsOutput> {
  return personalizedGrowthSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGrowthSuggestionsPrompt',
  input: {schema: PersonalizedGrowthSuggestionsInputSchema},
  output: {schema: PersonalizedGrowthSuggestionsOutputSchema},
  prompt: `You are a helpful university academic advisor. Your goal is to analyze a student's profile and provide personalized recommendations to help them plan their university journey and achieve their goals.

Based on the following student information, generate tailored recommendations for courses, extracurricular activities, and skill development tasks.

Student Profile:
Academic Progress: {{{academicProgress}}}
Engagement Activities: {{#each engagementActivities}}- {{{this}}}
{{/each}}
Interests: {{#each interests}}- {{{this}}}
{{/each}}

Provide clear and concise recommendations. For each recommendation, provide a name and a brief description explaining its relevance to the student's profile.
`,
});

const personalizedGrowthSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedGrowthSuggestionsFlow',
    inputSchema: PersonalizedGrowthSuggestionsInputSchema,
    outputSchema: PersonalizedGrowthSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
