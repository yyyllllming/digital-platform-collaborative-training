'use server';
/**
 * @fileOverview 一个用于智能匹配新生与高年级学生导师的 Genkit 工作流。
 *
 * - smartPeerMatching - 一个处理同伴匹配过程的函数。
 * - SmartPeerMatchingInput - smartPeerMatching 函数的输入类型。
 * - SmartPeerMatchingOutput - smartPeerMatching 函数的返回类型。
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewStudentProfileSchema = z.object({
  name: z.string().describe('新生的姓名。'),
  major: z.string().describe('新生的学术专业。'),
  academicInterests: z.array(z.string()).describe('新生的学术兴趣列表。'),
  hobbies: z.array(z.string()).describe('新生的爱好和课外活动列表。'),
  goals: z.string().describe('新生的学术和职业目标。'),
});

export type NewStudentProfile = z.infer<typeof NewStudentProfileSchema>;

const SeniorMentorProfileSchema = z.object({
  id: z.string().describe('高年级导师的唯一标识符。'),
  name: z.string().describe('高年级导师的姓名。'),
  major: z.string().describe('高年级导师的学术专业。'),
  academicInterests: z.array(z.string()).describe('高年级导师的学术兴趣列表。'),
  hobbies: z.array(z.string()).describe('高年级导师的爱好和课外活动列表。'),
  experienceSummary: z.string().describe('高年级导师相关经验、成就和领导角色的简要总结。'),
  availability: z.string().describe('导师的辅导可用时间（例如，“高”、“中”、“低”）。'),
});

export type SeniorMentorProfile = z.infer<typeof SeniorMentorProfileSchema>;

const SmartPeerMatchingInputSchema = z.object({
  newStudent: NewStudentProfileSchema.describe('寻求导师的新生个人资料。'),
  seniorMentors: z.array(SeniorMentorProfileSchema).describe('可用高年级学生导师及其个人资料的列表。'),
});

export type SmartPeerMatchingInput = z.infer<typeof SmartPeerMatchingInputSchema>;

const SmartPeerMatchingOutputSchema = z.object({
  matches: z.array(
    z.object({
      mentorId: z.string().describe('建议的高年级导师的唯一ID。'),
      mentorName: z.string().describe('建议的高年级导师的姓名。'),
      matchReason: z.string().describe('解释为什么这位导师是新生良好匹配的简洁理由。'),
    })
  ).describe('与新生匹配的最多3名最合适的高年级导师列表。'),
});

export type SmartPeerMatchingOutput = z.infer<typeof SmartPeerMatchingOutputSchema>;

export async function smartPeerMatching(input: SmartPeerMatchingInput): Promise<SmartPeerMatchingOutput> {
  return smartPeerMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartPeerMatchingPrompt',
  input: { schema: SmartPeerMatchingInputSchema },
  output: { schema: SmartPeerMatchingOutputSchema },
  prompt: `你是一个智能的同伴匹配助手。你的目标是根据新生的个人资料、兴趣和学术目标，帮助他们找到最合适的高年级学生导师。

这是新生的个人资料：
姓名: {{{newStudent.name}}}
专业: {{{newStudent.major}}}
学术兴趣: {{#each newStudent.academicInterests}}- {{{this}}}\n{{/each}}
爱好: {{#each newStudent.hobbies}}- {{{this}}}\n{{/each}}
目标: {{{newStudent.goals}}}

这是一份可用的高年级学生导师列表。请仔细审查每位导师的个人资料，并确定他们对新生的适合性。优先考虑与新生的学术兴趣、爱好或与新生目标相关的经验相似的导师。如果提供了可用时间，也请考虑。

可用的高年级导师：
{{#each seniorMentors}}
导师ID: {{{id}}}
导师姓名: {{{name}}}
专业: {{{major}}}
学术兴趣: {{#each academicInterests}}- {{{this}}}\n{{/each}}
爱好: {{#each hobbies}}- {{{this}}}\n{{/each}}
经验总结: {{{experienceSummary}}}
可用时间: {{{availability}}}
---
{{/each}}

根据新生的个人资料和可用的高年级导师，找出最多3名最合适的导师。对于每位建议的导师，提供他们的ID、姓名和一条简洁的理由，解释为什么他们是新生的良好匹配。如果没有找到合适的导师，返回一个空数组。

输出为符合 SmartPeerMatchingOutputSchema 的 JSON 格式。`,
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
