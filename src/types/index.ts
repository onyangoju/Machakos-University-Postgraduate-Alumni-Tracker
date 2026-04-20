// Graduate Tracking System - Type Definitions

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'graduate' | 'employer';
  createdAt: Date;
  lastLogin: Date;
}

export interface Graduate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  department: string;
  graduationYear: number;
  registrationNumber: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  location: string;
  country: string;
  skills: string[];
  linkedInUrl?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmploymentRecord {
  id: string;
  graduateId: string;
  companyName: string;
  jobTitle: string;
  department: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'self-employed' | 'unemployed';
  sector: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  salaryRange?: string;
  location: string;
  country: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  type: 'course_feedback' | 'employment_status' | 'skills_gap' | 'alumni_engagement';
  questions: Question[];
  createdBy: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  targetAudience: ('all' | 'course' | 'year' | 'department')[];
  createdAt: Date;
}

export interface Question {
  id: string;
  surveyId: string;
  questionText: string;
  questionType: 'single_choice' | 'multiple_choice' | 'rating' | 'text' | 'dropdown' | 'scale';
  options?: string[];
  isRequired: boolean;
  order: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  graduateId: string;
  answers: Answer[];
  submittedAt: Date;
  isComplete: boolean;
}

export interface Answer {
  questionId: string;
  value: string | string[] | number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'reunion' | 'webinar' | 'networking' | 'career_fair' | 'workshop';
  date: Date;
  endDate?: Date;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  organizer: string;
  maxAttendees?: number;
  attendees: string[];
  createdAt: Date;
}

export interface JobPosting {
  id: string;
  employerId: string;
  employerName: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  sector: string;
  salaryRange?: string;
  applicationDeadline: Date;
  contactEmail: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'survey' | 'event' | 'job' | 'reminder' | 'system';
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalGraduates: number;
  employedCount: number;
  unemployedCount: number;
  furtherStudiesCount: number;
  selfEmployedCount: number;
  employmentRate: number;
  averageSalary: string;
  topEmployers: { name: string; count: number }[];
  sectorDistribution: { sector: string; count: number }[];
  yearWiseStats: { year: number; total: number; employed: number }[];
}

export interface Course {
  id: string;
  name: string;
  department: string;
  duration: number;
  code: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  courses: string[];
}
