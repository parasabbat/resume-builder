export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  experience?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperienceItem {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  achievements?: string[];
  techStack?: string;
}

export interface EducationItem {
  year: string;
  degree: string;
  field: string;
  institution: string;
  marks?: string;
}

export interface ProjectItem {
  name: string;
  duration?: string;
  description?: string[];
  tools?: string;
}

export interface AdditionalInfo {
  languages?: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  skills: string[];
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  certifications?: string[];
  projects?: ProjectItem[];
  additionalInfo: AdditionalInfo;
}

export interface SavedResume {
  id: string;
  name: string;
  updatedAt: string;
  templateId: string;
  data: ResumeData;
}
