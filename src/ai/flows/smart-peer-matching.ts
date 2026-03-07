'use server';
/**
 * @fileOverview A Genkit flow for intelligently matching new students with senior student mentors.
 *
 * - smartPeerMatching - A function that handles the peer matching process.
 * - SmartPeerMatchingInput - The input type for the smartPeerMatching function.
 * - SmartPeerMatchingOutput - The return type for the smartPeerMatching function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewStudentProfileSchema = z.object({
  name: z.string().describe('The name of the new student.'),
  major: z.string().describe('The academic major of the new student.'),
  academicInterests: z.array(z.string()).describe('A list of academic interests of the new student.'),
  hobbies: z.array(z.string()).describe('A list of hobbies and extracurricular activities of the new student.'),
  goals: z.string().describe('The academic and career goals of the new student.'),
});

export type NewStudentProfile = z.infer<typeof NewStudentProfileSchema>;

const SeniorMentorProfileSchema = z.object({
  id: z.string().describe('Unique identifier for the senior mentor.'),
  name: z.string().describe('The name of the senior mentor.'),
  major: z.string().describe('The academic major of the senior mentor.'),
  academicInterests: z.array(z.string()).describe('A list of academic interests of the senior mentor.'),
  hobbies: z.array(z.string()).describe('A list of hobbies and extracurricular activities of the senior mentor.'),
  experienceSummary: z.string().describe('A brief summary of the senior mentor\u0027s relevant experience, achievements, and leadership roles.'),
  availability: z.string().describe('The mentor\u0027s availability for mentoring (e.g., \"High\", \"Medium\", \"Low\").'),
});

export type SeniorMentorProfile = z.infer<typeof SeniorMentorProfileSchema>;

const SmartPeerMatchingInputSchema = z.object({
  newStudent: NewStudentProfileSchema.describe('The profile of the new student seeking a mentor.'),
  seniorMentors: z.array(SeniorMentorProfileSchema).describe('A list of available senior student mentors with their profiles.'),
});

export type SmartPeerMatchingInput = z.infer<typeof SmartPeerMatchingInputSchema>;

const SmartPeerMatchingOutputSchema = z.object({
  matches: z.array(
    z.object({
      mentorId: z.string().describe('The unique ID of the suggested senior mentor.'),
      mentorName: z.string().describe('The name of the suggested senior mentor.'),
      matchReason: z.string().describe('A concise reason explaining why this mentor is a good match for the new student.'),
    })
  ).describe('A list of up to 3 most suitable senior mentors matched with the new student.'),
});

export type SmartPeerMatchingOutput = z.infer<typeof SmartPeerMatchingOutputSchema>;

export async function smartPeerMatching(input: SmartPeerMatchingInput): Promise<SmartPeerMatchingOutput> {
  return smartPeerMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartPeerMatchingPrompt',
  input: { schema: SmartPeerMatchingInputSchema },
  output: { schema: SmartPeerMatchingOutputSchema },
  prompt: `You are an intelligent peer matching assistant. Your goal is to help new students find the most suitable senior student mentors based on their profiles, interests, and academic goals.

Here is the new student's profile:
Name: {{{newStudent.name}}}
Major: {{{newStudent.major}}}
Academic Interests: {{#each newStudent.academicInterests}}- {{{this}}}\n{{/each}}
Hobbies: {{#each newStudent.hobbies}}- {{{this}}}\n{{/each}}
Goals: {{{newStudent.goals}}}

Here is a list of available senior student mentors. Please carefully review each mentor's profile and determine their suitability for the new student. Prioritize mentors who share similar academic interests, hobbies, or experiences relevant to the new student's goals. Also consider their availability if provided.

Available Senior Mentors:
{{#each seniorMentors}}
Mentor ID: {{{id}}}
Mentor Name: {{{name}}}
Major: {{{major}}}
Academic Interests: {{#each academicInterests}}- {{{this}}}\n{{/each}}
Hobbies: {{#each hobbies}}- {{{this}}}\n{{/each}}
Experience Summary: {{{experienceSummary}}}
Availability: {{{availability}}}
---
{{/each}}

Based on the new student's profile and the available senior mentors, identify up to 3 most suitable mentors. For each suggested mentor, provide their ID, name, and a concise reason explaining why they are a good match for the new student. If no suitable mentors are found, return an empty array.

Output in JSON format matching the SmartPeerMatchingOutputSchema.`,
});

const smartPeerMatchingFlow = ai.defineFlow(
  {
    name: 'smartPeerMatchingFlow',
    inputSchema: SmartPeerMatchingInputSchema,
    outputSchema: SmartPeerMatchingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
