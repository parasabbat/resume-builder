import FieldInput from './FieldInput';
import TextAreaInput from './TextAreaInput';
import SectionHeading from './SectionHeading';
import { ResumeData } from '@/app/types';

// REACT CONCEPT: Section Components
// - Manage a logical section of the form
// - Receive entire resume + update callback
// - Update specific fields via onChange handlers
// - Shows controlled component pattern at scale

interface PersonalInfoSectionProps {
  resume: ResumeData;
  onUpdate: (field: keyof ResumeData, value: any) => void;
}

export default function PersonalInfoSection({
  resume,
  onUpdate,
}: PersonalInfoSectionProps) {
  // Handler to update nested object property
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onUpdate('personalInfo', {
      ...resume.personalInfo,
      [field]: value,
    });
  };

  return (
    <div>
      <SectionHeading title="Personal Information" />

      <FieldInput
        label="Full Name"
        value={resume.personalInfo.name}
        onChange={(value) => updatePersonalInfo('name', value)}
        placeholder="John Doe"
        required
      />

      <FieldInput
        label="Job Title"
        value={resume.personalInfo.title}
        onChange={(value) => updatePersonalInfo('title', value)}
        placeholder="Senior Developer"
      />

      <FieldInput
        label="Email"
        type="email"
        value={resume.personalInfo.email}
        onChange={(value) => updatePersonalInfo('email', value)}
        placeholder="john@example.com"
        required
      />

      <FieldInput
        label="Phone"
        type="tel"
        value={resume.personalInfo.phone}
        onChange={(value) => updatePersonalInfo('phone', value)}
        placeholder="+1 (555) 123-4567"
      />

      <FieldInput
        label="Location"
        value={resume.personalInfo.location}
        onChange={(value) => updatePersonalInfo('location', value)}
        placeholder="San Francisco, CA"
      />

      <FieldInput
        label="Years of Experience"
        value={resume.personalInfo.experience || ''}
        onChange={(value) => updatePersonalInfo('experience', value)}
        placeholder="5+ years"
      />

      <FieldInput
        label="LinkedIn URL"
        type="url"
        value={resume.personalInfo.linkedin || ''}
        onChange={(value) => updatePersonalInfo('linkedin', value)}
        placeholder="https://linkedin.com/in/yourprofile"
      />

      <FieldInput
        label="GitHub URL"
        type="url"
        value={resume.personalInfo.github || ''}
        onChange={(value) => updatePersonalInfo('github', value)}
        placeholder="https://github.com/yourprofile"
      />

      <TextAreaInput
        label="Professional Summary"
        value={resume.profileSummary}
        onChange={(value) => onUpdate('profileSummary', value)}
        placeholder="Brief overview of your professional background and goals..."
        rows={4}
      />
    </div>
  );
}
