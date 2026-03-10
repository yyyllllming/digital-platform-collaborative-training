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
  name: '王晓明',
  major: '计算机科学',
  academicInterests: ['人工智能', '数据科学'],
  hobbies: ['篮球', '电影'],
  goals: '成为一名优秀的软件工程师。',
};

export const seniorMentors: SeniorMentorProfile[] = [
  {
    id: 'mentor-1',
    name: '李伟',
    major: '计算机科学',
    academicInterests: ['人工智能', '机器学习', '计算机视觉'],
    hobbies: ['编程', '阅读'],
    experienceSummary: '曾在Google实习，有丰富的项目经验。',
    availability: '高',
  },
  {
    id: 'mentor-2',
    name: '王芳',
    major: '自动化',
    academicInterests: ['控制理论', '机器人学'],
    hobbies: ['徒步', '摄影'],
    experienceSummary: '全国大学生机器人大赛一等奖获得者。',
    availability: '中',
  },
  {
    id: 'mentor-3',
    name: '张敏',
    major: '软件工程',
    academicInterests: ['Web开发', '移动应用开发'],
    hobbies: ['音乐', '游戏'],
    experienceSummary: '开发了多款独立应用，有创业经验。',
    availability: '高',
  },
  {
    id: 'mentor-4',
    name: '孙秀英',
    major: '数据科学',
    academicInterests: ['数据分析', '大数据', '深度学习'],
    hobbies: ['羽毛球', '旅游'],
    experienceSummary: 'Kaggle 大赛金牌，主导过多个数据科学项目。',
    availability: '高',
  },
  {
    id: 'mentor-5',
    name: '周静',
    major: '物联网工程',
    academicInterests: ['嵌入式系统', '传感器网络', '边缘计算'],
    hobbies: ['电子制作', '爬山'],
    experienceSummary: '设计并实现了一套智能家居系统原型。',
    availability: '中',
  },
  {
    id: 'mentor-6',
    name: '吴强',
    major: '网络安全',
    academicInterests: ['渗透测试', '密码学', '区块链'],
    hobbies: ['CTF比赛', '科幻小说'],
    experienceSummary: '多次在国内CTF比赛中获奖，有丰富的安全攻防经验。',
    availability: '低',
  },
];

export const students = [
  { id: 'student-1', name: '陈晨', major: '计算机科学', grade: '23级', interests: ['游戏开发', '图形学'], skills: ['C++', 'Unity'], email: 'chen.chen@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-1')?.imageUrl },
  { id: 'student-2', name: '刘洋', major: '软件工程', grade: '23级', interests: ['Web开发', 'DevOps'], skills: ['Java', 'Spring', 'Docker'], email: 'yang.liu@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-2')?.imageUrl },
  { id: 'student-3', name: '王静', major: '智能感知工程', grade: '22级', interests: ['物联网', '数据分析'], skills: ['Python', 'SQL'], email: 'jing.wang@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-3')?.imageUrl },
  { id: 'student-4', name: '李涛', major: '数据科学', grade: '22级', interests: ['机器学习', '自然语言处理'], skills: ['Python', 'TensorFlow'], email: 'tao.li@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-4')?.imageUrl },
  { id: 'student-5', name: '张悦', major: '自动化', grade: '23级', interests: ['机器人', '控制系统'], skills: ['C', 'MATLAB'], email: 'yue.zhang@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-5')?.imageUrl },
  { id: 'student-6', name: '徐峰', major: '网络工程', grade: '22级', interests: ['网络安全', '云计算'], skills: ['Linux', 'Bash'], email: 'feng.xu@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-6')?.imageUrl },
  { id: 'student-7', name: '黄娟', major: '计算机科学', grade: '23级', interests: ['移动开发', 'UI/UX设计'], skills: ['Swift', 'Figma'], email: 'juan.huang@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-7')?.imageUrl },
  { id: 'student-8', name: '马超', major: '软件工程', grade: '22级', interests: ['后端开发', '数据库'], skills: ['Go', 'PostgreSQL'], email: 'chao.ma@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-8')?.imageUrl },
  { id: 'student-9', name: '胡琳', major: '数据科学', grade: '23级', interests: ['数据可视化', '商业智能'], skills: ['R', 'Tableau'], email: 'lin.hu@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-9')?.imageUrl },
  { id: 'student-10', name: '林芳', major: '智能感知工程', grade: '22级', interests: ['边缘计算', '嵌入式AI'], skills: ['Python', 'C++'], email: 'fang.lin@example.com', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-10')?.imageUrl },
];


export const resources = [
  {
    id: 'res-1',
    title: '高级算法课程笔记',
    author: '李伟',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-1')?.imageUrl,
    description: '深入讲解了动态规划、图算法等高级主题。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-2')?.imageUrl,
    tags: ['算法', '计算机科学'],
  },
  {
    id: 'res-2',
    title: '机器学习入门指南',
    author: '王芳',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-2')?.imageUrl,
    description: '从零开始，用Python实现常见的机器学习模型。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-1')?.imageUrl,
    tags: ['AI', 'Python'],
  },
  {
    id: 'res-3',
    title: '前端开发面试宝典',
    author: '张敏',
    authorAvatar: placeholderImages.placeholderImages.find(p => p.id === 'mentor-3')?.imageUrl,
    description: '涵盖了JavaScript、React等常见面试题。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-3')?.imageUrl,
    tags: ['Web开发', '面试'],
  },
  {
    id: 'res-4',
    title: '如何参与开源项目',
    author: '张伟',
    authorAvatar: "https://picsum.photos/seed/mentor-main/100/100",
    description: '一步步教你如何为开源社区做出贡献。',
    image: placeholderImages.placeholderImages.find(p => p.id === 'resource-4')?.imageUrl,
    tags: ['开源', '职业发展'],
  }
];
