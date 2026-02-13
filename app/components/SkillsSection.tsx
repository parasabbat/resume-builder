import TextAreaInput from './TextAreaInput';
import SectionHeading from './SectionHeading';
import { ResumeData } from '@/app/types';
import styles from '../editor/forms.module.css';

// REACT CONCEPT: Array Processing Pattern
// - Skills stored as array: ['React', 'TypeScript', 'Node.js']
// - Convert to string for textarea: .join('\n')
// - Convert back to array: .split('\n')
// - Filter empty entries for clean data

interface SkillsSectionProps {
  resume: ResumeData;
  onUpdate: (field: keyof ResumeData, value: any) => void;
}

export default function SkillsSection({ resume, onUpdate }: SkillsSectionProps) {
  // Convert skills array to newline-separated string for editing
  const skillsText = resume.skills.join('\n');

  // Handle skills change: split, trim, filter empty
  const handleSkillsChange = (text: string) => {
    const skills = text
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onUpdate('skills', skills);
  };

  return (
    <div className={styles.formSection}>
      <SectionHeading title="Skills" subtitle="One skill per line" />

      <TextAreaInput
        label="Skills"
        value={skillsText}
        onChange={handleSkillsChange}
        placeholder="React&#10;TypeScript&#10;Node.js&#10;PostgreSQL&#10;Docker"
        rows={6}
      />

      {/* Preview of parsed skills */}
      {resume.skills.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            padding: '8px',
            background: '#f0fdf4',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#166534',
          }}
        >
          <strong>Skills found:</strong> {resume.skills.length}
        </div>
      )}
    </div>
  );
}
