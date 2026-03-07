import type { SeniorMentorProfile, NewStudentProfile } from './types';
import placeholderImages from './placeholder-images.json';

export const currentUser = {
  name: '杨黎明',
  email: 'liming.yang@example.com',
  avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'user-avatar')?.imageUrl,
  major: '智能感知工程',
  grade: '23级',
  interests: ['人工智能', '机器学习', 'Web开发'],
  skills: ['Python', 'JavaScript', 'React', 'Next.js'],
};

export const defaultNewStudentProfile: NewStudentProfile = {
  name: '张三',
  major: '计算机科学',
  academicInterests: ['人工智能', '数据科学'],
  hobbies: ['篮球', '电影'],
  goals: '成为一名优秀的软件工程师。',
};

export const seniorMentors: SeniorMentorProfile[] = [
  {
    id: 'mentor-1',
    name: '李四',
    major: '计算机科学',
    academicInterests: ['人工智能', '机器学习', '计算机视觉'],
    hobbies: ['编程', '阅读'],
    experienceSummary: '曾在Google实习，有丰富的项目经验。',
    availability: '高',
  },
  {
    id: 'mentor-2',
    name: '王五',
    major: '自动化',
    academicInterests: ['控制理论', '机器人学'],
    hobbies: ['徒步', '摄影'],
    experienceSummary: '全国大学生机器人大赛一等奖获得者。',
    availability: '中',
  },
  {
    id: 'mentor-3',
    name: '赵六',
    major: '软件工程',
    academicInterests: ['Web开发', '移动应用开发'],
    hobbies: ['音乐', '游戏'],
    experienceSummary: '开发了多款独立应用，有创业经验。',
    availability: '高',
  },
];

export const resources = [
  {
    id: 'res-1',
    title: '高级算法课程笔记',
    author: '李四',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-1')?.imageUrl,
    description: '深入讲解了动态规划、图算法等高级主题。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-2')?.imageUrl,
    tags: ['算法', '计算机科学'],
  },
  {
    id: 'res-2',
    title: '机器学习入门指南',
    author: '王五',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-2')?.imageUrl,
    description: '从零开始，用Python实现常见的机器学习模型。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-1')?.imageUrl,
    tags: ['AI', 'Python'],
  },
  {
    id: 'res-3',
    title: '前端开发面试宝典',
    author: '赵六',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-3')?.imageUrl,
    description: '涵盖了JavaScript、React等常见面试题。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-3')?.imageUrl,
    tags: ['Web开发', '面试'],
  },
  {
    id: 'res-4',
    title: '如何参与开源项目',
    author: 'John Doe',
    authorAvatar: "https://picsum.photos/seed/mentor-main/100/100",
    description: '一步步教你如何为开源社区做出贡献。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-4')?.imageUrl,
    tags: ['开源', '职业发展'],
  }
];
