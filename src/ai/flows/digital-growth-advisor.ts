'use server';
/**
 * @fileOverview 数字成长顾问 AI 代理。
 *
 * - digitalGrowthAdvisor - 一个为学生提供个性化建议和预测性见解的函数。
 * - DigitalGrowthAdvisorInput - digitalGrowthAdvisor 函数的输入类型。
 * - DigitalGrowthAdvisorOutput - digitalGrowthAdvisor 函数的返回类型。
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// 输入模式
const DigitalGrowthAdvisorInputSchema = z.object({
  studentProfileDescription: z.string().describe(
    "学生当前情况的详细文字描述，包括学术背景、专业、成绩、兴趣、技能、课外活动和职业规划。例如：'学生是一名大三计算机科学专业的学生，GPA 3.8，对 AI/ML 有浓厚兴趣，参加过编程马拉松，熟练掌握 Python 和 C++。职业目标：成为一家大型科技公司的软件工程师。'"
  ),
  historicalDataContext: z.string().describe(
    "匿名历史学生数据的摘要，包括常见的成功模式、类似背景学生面临的典型挑战以及不同学术路径的职业成果。此背景信息有助于提供预测性见解。例如：'历史数据显示，对AI感兴趣的计算机科学专业学生如果选修了高级统计学，通常会在数据科学领域取得成功。学年初在数学上遇到困难的学生通常能从同伴辅导中受益。'"
  ),
});
export type DigitalGrowthAdvisorInput = z.infer<typeof DigitalGrowthAdvisorInputSchema>;

// 输出模式
const DigitalGrowthAdvisorOutputSchema = z.object({
  predictedPaths: z.array(
    z.object({
      pathName: z.string().describe("一个潜在的学术或职业路径名称（例如，“软件工程师 - AI/ML方向”，“计算机视觉学术研究员”）。"),
      description: z.string().describe("根据学生的个人情况和历史数据，对这条预测路径的简要描述及其适合原因。"),
      likelihood: z.enum(['High', 'Medium', 'Low']).describe("根据当前个人情况和历史数据，学生成功追求此路径的估计可能性。"),
    })
  ).describe("一个包含预测性见解的潜在学术和职业路径数组。"),
  personalizedAdvice: z.string().describe("为学生量身定制的建议，以帮助他们实现目标、克服挑战或做出明智决策，建议会考虑他们的个人情况和历史模式。"),
  recommendations: z.array(z.string()).describe("可行的建议，如具体的课程、需要发展的技能、可以申请的实习或社交活动。"),
});
export type DigitalGrowthAdvisorOutput = z.infer<typeof DigitalGrowthAdvisorOutputSchema>;

export async function digitalGrowthAdvisor(input: DigitalGrowthAdvisorInput): Promise<DigitalGrowthAdvisorOutput> {
  return digitalGrowthAdvisorFlow(input);
}

const digitalGrowthAdvisorPrompt = ai.definePrompt({
  name: 'digitalGrowthAdvisorPrompt',
  input: { schema: DigitalGrowthAdvisorInputSchema },
  output: { schema: DigitalGrowthAdvisorOutputSchema },
  prompt: `你是一位数字成长顾问，旨在帮助学生就其学术和职业道路做出明智的决定。
你的任务是分析学生的当前个人情况和历史学生数据摘要，以提供预测性见解和个性化建议。

请仔细考虑“历史数据背景”，以识别与学生的“学生个人情况描述”相关的模式、常见成功因素和潜在陷阱。
然后，生成一个包含可能性评级的潜在学术和职业路径列表，提供个性化建议，并提出可行的建议。

学生个人情况描述:
{{{studentProfileDescription}}}

历史数据背景:
{{{historicalDataContext}}}

请以指定的 JSON 格式提供你的分析和建议。`,
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
      throw new Error("未能生成数字成长顾问的输出。");
    }
    return output;
  }
);
