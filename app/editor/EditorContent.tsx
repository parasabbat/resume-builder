'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ResumeData, WorkExperienceItem, EducationItem, ProjectItem } from '../types/resume';
import { getResumeById, updateResume } from '../utils/storage';
import { generateShareUrl, getUrlLengthWarning } from '../utils/sharing';
import defaultData from '../../data/data.json';
import styles from './forms.module.css';
import inputStyles from './inputs.module.css';

// REACT CONCEPT: Simplified Refactor
// - Keeps existing data structure intact
// - Organizes with CSS Modules for better maintainability
// - Auto-save continues to work
// - All form logic preserved

export default function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get('id');

  const [data, setData] = useState<ResumeData>(defaultData as ResumeData);
  const [resumeName, setResumeName] = useState('Untitled Resume');
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Load resume from storage
  useEffect(() => {
    if (resumeId) {
      const saved = getResumeById(resumeId);
      if (saved) {
        setData(saved.data);
        setResumeName(saved.name);
        setActiveResumeId(saved.id);
      }
    } else {
      router.replace('/');
      return;
    }
  }, [resumeId, router]);

  // Auto-save with debouncing
  useEffect(() => {
    if (!activeResumeId) return;
    setSaveStatus('unsaved');
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      updateResume(activeResumeId, { data, name: resumeName });
      setSaveStatus('saved');
    }, 800);
    return () => clearTimeout(timer);
  }, [data, resumeName, activeResumeId]);

  // Handlers for personal info
  const updatePersonalInfo = useCallback(
    (field: keyof ResumeData['personalInfo'], value: string) => {
      setData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    },
    []
  );

  // Handlers for skills
  const updateSkills = useCallback((skills: string[]) => {
    setData((prev) => ({ ...prev, skills }));
  }, []);

  // Handlers for work experience
  const updateWorkExperience = useCallback((workExperience: WorkExperienceItem[]) => {
    setData((prev) => ({ ...prev, workExperience }));
  }, []);

  // Handlers for education
  const updateEducation = useCallback((education: EducationItem[]) => {
    setData((prev) => ({ ...prev, education }));
  }, []);

  // Handlers for certifications
  const updateCertifications = useCallback((certifications: string[]) => {
    setData((prev) => ({ ...prev, certifications }));
  }, []);

  // Handlers for projects
  const updateProjects = useCallback((projects: ProjectItem[]) => {
    setData((prev) => ({ ...prev, projects }));
  }, []);

  // Handlers for additional info
  const updateLanguages = useCallback((languages: string[]) => {
    setData((prev) => ({ ...prev, additionalInfo: { ...prev.additionalInfo, languages } }));
  }, []);

  // Share functionality
  const handleShare = () => {
    const url = generateShareUrl(data);
    setShareUrl(url);
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Export to JSON file
  const handleExport = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={styles.editorContainer}>
      {/* LEFT PANEL - FORM INPUTS */}
      <form className={styles.formPanel}>
        {/* Resume Name */}
        <div className={styles.resumeNameContainer}>
          <label className={styles.resumeNameLabel}>Resume Name</label>
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className={styles.resumeNameInput}
            placeholder="My Resume"
          />
          <p
            className={`${styles.saveStatus} ${saveStatus === 'saved' ? styles.saved : saveStatus === 'unsaved' ? styles.unsaved : styles.saving}`}
          >
            {saveStatus === 'saved' && '✓ Auto-saved'}
            {saveStatus === 'unsaved' && '⏳ Unsaved changes'}
            {saveStatus === 'saving' && '⏳ Saving...'}
          </p>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Personal Information
          </h3>

          {(['name', 'title', 'phone', 'email', 'location', 'experience', 'linkedin', 'github'] as const).map(
            (field) => (
              <FieldInput
                key={field}
                label={fieldLabel(field)}
                value={data.personalInfo[field] ?? ''}
                onChange={(val) => updatePersonalInfo(field, val)}
              />
            )
          )}

          <div style={{ marginTop: '12px' }}>
            <label className={inputStyles.label}>Professional Summary</label>
            <textarea
              value={data.profileSummary}
              onChange={(e) => setData((prev) => ({ ...prev, profileSummary: e.target.value }))}
              rows={4}
              className={inputStyles.textarea}
            />
          </div>
        </div>

        {/* SKILLS */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Skills
          </h3>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>One skill per line</p>
          <textarea
            value={data.skills.join('\n')}
            onChange={(e) =>
              updateSkills(e.target.value.split('\n').filter((s) => s.trim() !== ''))
            }
            rows={6}
            className={inputStyles.textarea}
          />
        </div>

        {/* WORK EXPERIENCE */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Work Experience
          </h3>
          {data.workExperience.map((job, idx) => (
            <WorkExperienceForm
              key={idx}
              index={idx}
              job={job}
              onChange={(updated) => {
                const newJobs = [...data.workExperience];
                newJobs[idx] = updated;
                updateWorkExperience(newJobs);
              }}
              onRemove={() => updateWorkExperience(data.workExperience.filter((_, i) => i !== idx))}
            />
          ))}
          <button
            onClick={() =>
              updateWorkExperience([
                ...data.workExperience,
                { title: '', company: '', period: '', responsibilities: [] },
              ])
            }
            className={styles.addItemButton}
          >
            + Add Work Experience
          </button>
        </div>

        {/* EDUCATION */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Education
          </h3>
          {data.education.map((edu, idx) => (
            <EducationForm
              key={idx}
              index={idx}
              edu={edu}
              onChange={(updated) => {
                const newEdus = [...data.education];
                newEdus[idx] = updated;
                updateEducation(newEdus);
              }}
              onRemove={() => updateEducation(data.education.filter((_, i) => i !== idx))}
            />
          ))}
          <button
            onClick={() =>
              updateEducation([...data.education, { year: '', degree: '', field: '', institution: '' }])
            }
            className={styles.addItemButton}
          >
            + Add Education
          </button>
        </div>

        {/* CERTIFICATIONS */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Certifications
          </h3>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>One per line</p>
          <textarea
            value={(data.certifications ?? []).join('\n')}
            onChange={(e) =>
              updateCertifications(e.target.value.split('\n').filter((s) => s.trim() !== ''))
            }
            rows={4}
            className={inputStyles.textarea}
          />
        </div>

        {/* PROJECTS */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Projects
          </h3>
          {(data.projects ?? []).map((project, idx) => (
            <ProjectForm
              key={idx}
              index={idx}
              project={project}
              onChange={(updated) => {
                const newProjects = [...(data.projects ?? [])];
                newProjects[idx] = updated;
                updateProjects(newProjects);
              }}
              onRemove={() => updateProjects((data.projects ?? []).filter((_, i) => i !== idx))}
            />
          ))}
          <button
            onClick={() => updateProjects([...(data.projects ?? []), { name: '' }])}
            className={styles.addItemButton}
          >
            + Add Project
          </button>
        </div>

        {/* ADDITIONAL INFORMATION */}
        <div className={styles.formSection}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#222b38', margin: '0 0 12px' }}>
            Languages
          </h3>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>One per line</p>
          <textarea
            value={(data.additionalInfo?.languages ?? []).join('\n')}
            onChange={(e) =>
              updateLanguages(e.target.value.split('\n').filter((s) => s.trim() !== ''))
            }
            rows={3}
            className={inputStyles.textarea}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleExport}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            📥 Export JSON
          </button>
          <button
            type="button"
            onClick={handleShare}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            🔗 Copy Share Link
          </button>
        </div>

        {shareUrl && (
          <div className={styles.shareUrlContainer}>
            <strong>Share URL copied!</strong>
            <code>{shareUrl}</code>
            {getUrlLengthWarning(shareUrl) && (
              <p className={styles.shareUrlWarning}>{getUrlLengthWarning(shareUrl)}</p>
            )}
          </div>
        )}

        <div className={styles.formBottom} />
      </form>

      {/* RIGHT PANEL - JSON PREVIEW */}
      <div className={styles.previewPanel}>
        <div className={styles.previewHeader}>
          <span className={styles.previewLabel}>JSON Preview (auto-updates)</span>
          <button onClick={handleCopyJson} className={styles.copyJsonButton}>
            {copySuccess ? '✓ Copied!' : 'Copy JSON'}
          </button>
        </div>
        <pre className={styles.jsonPreview}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

// NESTED FORM COMPONENTS
function WorkExperienceForm({
  index,
  job,
  onChange,
  onRemove,
}: {
  index: number;
  job: WorkExperienceItem;
  onChange: (u: WorkExperienceItem) => void;
  onRemove: () => void;
}) {
  const updateField = (field: keyof WorkExperienceItem, value: string | string[]) =>
    onChange({ ...job, [field]: value });

  return (
    <div className={styles.nestedForm}>
      <div className={styles.nestedFormHeader}>
        <strong className={styles.nestedFormTitle}>
          {job.title || 'New Position'} at {job.company || 'Company'}
        </strong>
        <button type="button" onClick={onRemove} className={styles.removeButton}>
          Remove
        </button>
      </div>
      <FieldInput
        label="Job Title"
        value={job.title}
        onChange={(v) => updateField('title', v)}
      />
      <FieldInput label="Company" value={job.company} onChange={(v) => updateField('company', v)} />
      <FieldInput label="Period" value={job.period} onChange={(v) => updateField('period', v)} />
      <FieldInput
        label="Tech Stack"
        value={job.techStack ?? ''}
        onChange={(v) => updateField('techStack', v)}
      />
      <label className={inputStyles.label}>Responsibilities</label>
      <textarea
        value={job.responsibilities.join('\n')}
        onChange={(e) =>
          updateField(
            'responsibilities',
            e.target.value
              .split('\n')
              .filter((s) => s.trim() !== '')
          )
        }
        rows={3}
        className={inputStyles.textarea}
      />
      <label className={inputStyles.label}>Achievements</label>
      <textarea
        value={(job.achievements ?? []).join('\n')}
        onChange={(e) =>
          updateField(
            'achievements',
            e.target.value
              .split('\n')
              .filter((s) => s.trim() !== '')
          )
        }
        rows={2}
        className={inputStyles.textarea}
      />
    </div>
  );
}

function EducationForm({
  index,
  edu,
  onChange,
  onRemove,
}: {
  index: number;
  edu: EducationItem;
  onChange: (u: EducationItem) => void;
  onRemove: () => void;
}) {
  const updateField = (field: keyof EducationItem, value: string) =>
    onChange({ ...edu, [field]: value });

  return (
    <div className={styles.nestedForm}>
      <div className={styles.nestedFormHeader}>
        <strong className={styles.nestedFormTitle}>
          {edu.degree || 'Degree'} from {edu.institution || 'School'}
        </strong>
        <button type="button" onClick={onRemove} className={styles.removeButton}>
          Remove
        </button>
      </div>
      <FieldInput label="Degree" value={edu.degree} onChange={(v) => updateField('degree', v)} />
      <FieldInput label="Field" value={edu.field} onChange={(v) => updateField('field', v)} />
      <FieldInput
        label="Institution"
        value={edu.institution}
        onChange={(v) => updateField('institution', v)}
      />
      <FieldInput label="Year" value={edu.year} onChange={(v) => updateField('year', v)} />
      <FieldInput
        label="GPA/Marks"
        value={edu.marks ?? ''}
        onChange={(v) => updateField('marks', v)}
      />
    </div>
  );
}

function ProjectForm({
  index,
  project,
  onChange,
  onRemove,
}: {
  index: number;
  project: ProjectItem;
  onChange: (u: ProjectItem) => void;
  onRemove: () => void;
}) {
  const updateField = (field: keyof ProjectItem, value: string | string[]) =>
    onChange({ ...project, [field]: value });

  return (
    <div className={styles.nestedForm}>
      <div className={styles.nestedFormHeader}>
        <strong className={styles.nestedFormTitle}>{project.name || 'New Project'}</strong>
        <button type="button" onClick={onRemove} className={styles.removeButton}>
          Remove
        </button>
      </div>
      <FieldInput label="Name" value={project.name} onChange={(v) => updateField('name', v)} />
      <FieldInput
        label="Duration"
        value={project.duration ?? ''}
        onChange={(v) => updateField('duration', v)}
      />
      <FieldInput label="Tools" value={project.tools ?? ''} onChange={(v) => updateField('tools', v)} />
      <label className={inputStyles.label}>Description</label>
      <textarea
        value={(project.description ?? []).join('\n')}
        onChange={(e) =>
          updateField(
            'description',
            e.target.value
              .split('\n')
              .filter((s) => s.trim() !== '')
          )
        }
        rows={3}
        className={inputStyles.textarea}
      />
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={inputStyles.fieldContainer}>
      <label className={inputStyles.label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputStyles.input}
      />
    </div>
  );
}

function fieldLabel(field: string): string {
  const labels: Record<string, string> = {
    name: 'Full Name',
    title: 'Job Title',
    phone: 'Phone',
    email: 'Email',
    location: 'Location',
    experience: 'Years of Experience',
    linkedin: 'LinkedIn URL',
    github: 'GitHub URL',
  };
  return labels[field] ?? field;
}
