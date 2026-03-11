import {
  collaborationSteps,
  communityPosts,
  currentUser,
  dashboardTasks,
  freshmanBenefits,
  platformMetrics,
  resources,
  seniorBenefits,
  seniorMentors,
  students,
} from '@/lib/data';

export function getCurrentUser() {
  return currentUser;
}

export function getStudents() {
  return students;
}

export function getMentors() {
  return seniorMentors;
}

export function getResources() {
  return resources;
}

export function getCommunityPosts() {
  return communityPosts;
}

export function getDashboardData() {
  return {
    mentor: seniorMentors[0],
    recentResource: resources[0],
    platformMetrics,
    dashboardTasks,
    seniorBenefits,
  };
}

export function getCollaborationOverview() {
  return {
    collaborationSteps,
    freshmanBenefits,
    seniorBenefits,
  };
}
