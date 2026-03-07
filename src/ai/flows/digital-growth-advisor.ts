'use server';
/**
 * @fileOverview A digital growth advisor AI agent.
 *
 * - digitalGrowthAdvisor - A function that provides personalized advice and predictive insights to students.
 * - DigitalGrowthAdvisorInput - The input type for the digitalGrowthAdvisor function.
 * - DigitalGrowthAdvisorOutput - The return type for the digitalGrowthAdvisor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const DigitalGrowthAdvisorInputSchema = z.object({
  studentProfileDescription: z.string().describe(
    "A detailed textual description of the student's current profile, including academic background, major, grades, interests, skills, extracurricular activities, and career aspirations. For example: 'Student is a 3rd-year Computer Science major with a 3.8 GPA, strong interest in AI/ML, participated in hackathons, proficient in Python and C++. Aspiration: Software Engineer at a major tech company.'"
  ),
  historicalDataContext: z.string().describe(
    "A summary of anonymized historical student data, including common success patterns, typical challenges faced by students with similar profiles, and career outcomes for various academic paths. This context helps in providing predictive insights. For example: 'Historical data shows that CS majors with AI interests often succeed in data science roles if they take advanced statistics. Students struggling with math in early years often benefit from peer tutoring.'"
  ),
});
export type DigitalGrowthAdvisorInput = z.infer<typeof DigitalGrowthAdvisorInputSchema>;

// Output Schema
const DigitalGrowthAdvisorOutputSchema = z.object({
  predictedPaths: z.array(
    z.object({
      pathName: z.string().describe("The name of a potential academic or career path (e.g., 'Software Engineer - AI/ML Focus', 'Academic Researcher in Computer Vision')."),
      description: z.string().describe("A brief description of this predicted path and why it's suitable based on the student's profile and historical data."),
      likelihood: z.enum(['High', 'Medium', 'Low']).describe("The estimated likelihood of the student successfully pursuing this path based on current profile and historical data."),
    })
  ).describe("An array of potential academic and career paths with predictive insights."),
  personalizedAdvice: z.string().describe("Tailored advice for the student to achieve their goals, overcome challenges, or make informed decisions, considering their profile and historical patterns."),
  recommendations: z.array(z.string()).describe("Actionable recommendations such as specific courses, skills to develop, internships to pursue, or networking activities."),
});
export type DigitalGrowthAdvisorOutput = z.infer<typeof DigitalGrowthAdvisorOutputSchema>;

export async function digitalGrowthAdvisor(input: DigitalGrowthAdvisorInput): Promise<DigitalGrowthAdvisorOutput> {
  return digitalGrowthAdvisorFlow(input);
}

const digitalGrowthAdvisorPrompt = ai.definePrompt({
  name: 'digitalGrowthAdvisorPrompt',
  input: { schema: DigitalGrowthAdvisorInputSchema },
  output: { schema: DigitalGrowthAdvisorOutputSchema },
  prompt: `You are a Digital Growth Advisor designed to help students make informed decisions about their academic and career paths.
Your task is to analyze a student's current profile and a summary of historical student data to provide predictive insights and personalized advice.

Carefully consider the 'Historical Data Context' to identify patterns, common success factors, and potential pitfalls relevant to the student's 'Student Profile Description'.
Then, generate a list of potential academic and career paths with their likelihood, provide personalized advice, and suggest actionable recommendations.

Student Profile Description:
{{{studentProfileDescription}}}

Historical Data Context:
{{{historicalDataContext}}}

Please provide your analysis and recommendations in the specified JSON format.`,
});

const digitalGrowthAdvisorFlow = ai.defineFlow(
  {
    name: 'digitalGrowthAdvisorFlow',
    inputSchema: DigitalGrowthAdvisorInputSchema,
    outputSchema: DigitalGrowthAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await digitalGrowthAdvisorPrompt(input);
    if (!output) {
      throw new Error("Failed to generate digital growth advisor output.");
    }
    return output;
  }
);
