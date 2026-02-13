export type {
  PersonalInfo,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
  AdditionalInfo,
  ResumeData,
  SavedResume,
} from './resume';

// Alias for modern naming
export type Resume = ResumeData;
export type Work = WorkExperienceItem;
export type Education = EducationItem;
export type Project = ProjectItem;
export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
};
