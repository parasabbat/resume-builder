import PersonalInfoSection from './PersonalInfoSection';
import SkillsSection from './SkillsSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import CertificationsSection from './CertificationsSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import { ResumeData } from '@/app/types';
import styles from '../editor/forms.module.css';

// REACT CONCEPT: Orchestrator Component
// - Combines multiple section components
// - Passes resume state + update callback to each
// - Handles form submission and export
// - Keeps complex logic centralized

interface EditorFormProps {
  resume: ResumeData;
  resumeName: string;
  onResumeNameChange: (name: string) => void;
  onUpdate: (field: keyof ResumeData, value: any) => void;
  onExport: () => void;
  onShare: () => void;
  onImport: () => void;
  isSaving?: boolean;
}

export default function EditorForm({
  resume,
  resumeName,
  onResumeNameChange,
  onUpdate,
  onExport,
  onShare,
  onImport,
  isSaving = false,
}: EditorFormProps) {
  return (
    <form className={styles.formPanel}>
      {/* Resume name input */}
      <div className={styles.resumeNameContainer}>
        <label className={styles.resumeNameLabel}>Resume Name</label>
        <input
          type="text"
          value={resumeName}
          onChange={(e) => onResumeNameChange(e.target.value)}
          className={styles.resumeNameInput}
          placeholder="My Resume"
        />
        <p className={`${styles.saveStatus} ${isSaving ? styles.saving : styles.saved}`}>
          {isSaving ? '⏳ Saving...' : '✓ Auto-saved'}
        </p>
      </div>

      {/* Form sections */}
      <PersonalInfoSection resume={resume} onUpdate={onUpdate} />
      <SkillsSection resume={resume} onUpdate={onUpdate} />
      <WorkExperienceSection resume={resume} onUpdate={onUpdate} />
      <EducationSection resume={resume} onUpdate={onUpdate} />
      <ProjectsSection resume={resume} onUpdate={onUpdate} />
      <CertificationsSection resume={resume} onUpdate={onUpdate} />
      <AdditionalInfoSection resume={resume} onUpdate={onUpdate} />

      {/* Action buttons */}
      <div className={styles.formActions}>
        <button type="button" onClick={onExport} className={`${styles.button} ${styles.buttonPrimary}`}>
          📥 Export JSON
        </button>
        <button type="button" onClick={onImport} className={`${styles.button} ${styles.buttonPrimary}`}>
          📤 Import JSON
        </button>
        <button type="button" onClick={onShare} className={`${styles.button} ${styles.buttonSecondary}`}>
          🔗 Copy Share Link
        </button>
      </div>

      <div className={styles.formBottom} />
    </form>
  );
}
