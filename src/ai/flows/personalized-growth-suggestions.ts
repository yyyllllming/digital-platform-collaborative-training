'use server';
/**
 * @fileOverview 一个用于为学生生成个性化成长建议的 Genkit 工作流。
 *
 * - getPersonalizedGrowthSuggestions - 一个生成个性化推荐的函数。
 * - PersonalizedGrowthSuggestionsInput - getPersonalizedGrowthSuggestions 函数的输入类型。
 * - PersonalizedGrowthSuggestionsOutput - getPersonalizedGrowthSuggestions 函数的返回类型。
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGrowthSuggestionsInputSchema = z.object({
  academicProgress: z.string().describe('学生学业表现和成绩的摘要。'),
  engagementActivities: z.array(z.string()).describe('学生参与的课外活动、俱乐部或项目列表。'),
  interests: z.array(z.string()).describe('学生陈述的兴趣和职业愿望列表。'),
});
export type PersonalizedGrowthSuggestionsInput = z.infer<typeof PersonalizedGrowthSuggestionsInputSchema>;

const RecommendationItemSchema = z.object({
  name: z.string().describe('推荐项的名称（例如，课程名称、活动名称）。'),
  description: z.string().describe('对推荐项的简要描述及其适合性的原因。'),
});

const PersonalizedGrowthSuggestionsOutputSchema = z.object({
  courseRecommendations: z.array(RecommendationItemSchema).describe('为学生推荐的课程。'),
  extracurricularRecommendations: z.array(RecommendationItemSchema).describe('推荐的课外活动或俱乐部。'),
  skillDevelopmentRecommendations: z.array(RecommendationItemSchema).describe('推荐的技能发展任务或工作坊。'),
});
export type PersonalizedGrowthSuggestionsOutput = z.infer<typeof PersonalizedGrowthSuggestionsOutputSchema>;

export async function getPersonalizedGrowthSuggestions(input: PersonalizedGrowthSuggestionsInput): Promise<PersonalizedGrowthSuggestionsOutput> {
  return personalizedGrowthSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGrowthSuggestionsPrompt',
  input: {schema: PersonalizedGrowthSuggestionsInputSchema},
  output: {schema: PersonalizedGrowthSuggestionsOutputSchema},
  prompt: `你是一位乐于助人的大学学术顾问。你的目标是分析学生的个人情况，并提供个性化的建议，以帮助他们规划大学生涯并实现目标。

根据以下学生信息，为课程、课外活动和技能发展任务生成量身定制的建议。

学生档案:
学业进展: {{{academicProgress}}}
参与活动: {{#each engagementActivities}}- {{{this}}}
{{/each}}
兴趣: {{#each interests}}- {{{this}}}
{{/each}}

提供清晰简洁的建议。对于每项建议，请提供名称和简要说明，解释其与学生个人情况的相关性。
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
