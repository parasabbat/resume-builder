'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ResumeData, WorkExperienceItem, EducationItem, ProjectItem } from '../types/resume';
import { getResumeById, updateResume } from '../utils/storage';
import { generateShareUrl, getUrlLengthWarning } from '../utils/sharing';
import defaultData from '../../data/data.json';

export default function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get('id');

  const [data, setData] = useState<ResumeData>(defaultData as ResumeData);
  const [resumeName, setResumeName] = useState('Untitled Resume');
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');
  const [shareUrl, setShareUrl] = useState<string | null>(null);

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

  const updatePersonalInfo = useCallback(
    (field: keyof ResumeData['personalInfo'], value: string) => {
      setData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    },
    []
  );

  const updateSkills = useCallback((skills: string[]) => {
    setData((prev) => ({ ...prev, skills }));
  }, []);

  const updateWorkExperience = useCallback((workExperience: WorkExperienceItem[]) => {
    setData((prev) => ({ ...prev, workExperience }));
  }, []);

  const updateEducation = useCallback((education: EducationItem[]) => {
    setData((prev) => ({ ...prev, education }));
  }, []);

  const updateCertifications = useCallback((certifications: string[]) => {
    setData((prev) => ({ ...prev, certifications }));
  }, []);

  const updateProjects = useCallback((projects: ProjectItem[]) => {
    setData((prev) => ({ ...prev, projects }));
  }, []);

  const updateLanguages = useCallback((languages: string[]) => {
    setData((prev) => ({ ...prev, additionalInfo: { ...prev.additionalInfo, languages } }));
  }, []);

  const handleShare = () => {
    const url = generateShareUrl(data);
    setShareUrl(url);
    navigator.clipboard.writeText(url);
  };

  return (
    <div suppressHydrationWarning style={{ display: 'flex', height: 'calc(100vh - 90px)' }}>
      <div style={{ flex: '1 1 55%', overflowY: 'auto', padding: '20px 24px', borderRight: '1px solid #e5e8ee' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Resume Name</label>
          <input type="text" value={resumeName} onChange={(e) => setResumeName(e.target.value)} style={{ ...inputStyle, fontWeight: 600, fontSize: '16px' }} />
          <span style={{ fontSize: '12px', color: saveStatus === 'saved' ? '#16a34a' : saveStatus === 'unsaved' ? '#d97706' : '#596375' }}>
            {saveStatus === 'saved' && ' Saved'}
            {saveStatus === 'unsaved' && ' Unsaved changes'}
            {saveStatus === 'saving' && ' Saving...'}
          </span>
        </div>

        <SectionHeading title="Personal Information" />
        {(['name', 'title', 'phone', 'email', 'location', 'experience', 'linkedin', 'github'] as const).map((field) => (
          <FieldInput key={field} label={fieldLabel(field)} value={data.personalInfo[field] ?? ''} onChange={(val) => updatePersonalInfo(field, val)} />
        ))}

        <SectionHeading title="Profile Summary" />
        <textarea value={data.profileSummary} onChange={(e) => setData((prev) => ({ ...prev, profileSummary: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />

        <SectionHeading title="Skills" />
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>One skill per line</p>
        <textarea value={data.skills.join('\n')} onChange={(e) => updateSkills(e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={6} style={{ ...inputStyle, resize: 'vertical' }} />

        <SectionHeading title="Work Experience" />
        {data.workExperience.map((job, idx) => (
          <WorkExperienceForm key={idx} index={idx} job={job}
            onChange={(updated) => { const newJobs = [...data.workExperience]; newJobs[idx] = updated; updateWorkExperience(newJobs); }}
            onRemove={() => updateWorkExperience(data.workExperience.filter((_, i) => i !== idx))}
          />
        ))}
        <button onClick={() => updateWorkExperience([...data.workExperience, { title: '', company: '', period: '', responsibilities: [''] }])} style={addButtonStyle}>+ Add Work Experience</button>

        <SectionHeading title="Education" />
        {data.education.map((edu, idx) => (
          <EducationForm key={idx} index={idx} edu={edu}
            onChange={(updated) => { const newEdus = [...data.education]; newEdus[idx] = updated; updateEducation(newEdus); }}
            onRemove={() => updateEducation(data.education.filter((_, i) => i !== idx))}
          />
        ))}
        <button onClick={() => updateEducation([...data.education, { year: '', degree: '', field: '', institution: '' }])} style={addButtonStyle}>+ Add Education</button>

        <SectionHeading title="Certifications" />
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>One certification per line</p>
        <textarea value={(data.certifications ?? []).join('\n')} onChange={(e) => updateCertifications(e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />

        <SectionHeading title="Projects" />
        {(data.projects ?? []).map((project, idx) => (
          <ProjectForm key={idx} index={idx} project={project}
            onChange={(updated) => { const newProjects = [...(data.projects ?? [])]; newProjects[idx] = updated; updateProjects(newProjects); }}
            onRemove={() => updateProjects((data.projects ?? []).filter((_, i) => i !== idx))}
          />
        ))}
        <button onClick={() => updateProjects([...(data.projects ?? []), { name: '' }])} style={addButtonStyle}>+ Add Project</button>

        <SectionHeading title="Additional Information" />
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>Languages (one per line)</p>
        <textarea value={(data.additionalInfo?.languages ?? []).join('\n')} onChange={(e) => updateLanguages(e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e8ee', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => router.push(`/preview?id=${activeResumeId}`)} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#1a56db', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Preview Resume</button>
          <button onClick={handleShare} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#059669', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Public Share Link</button>
        </div>

        {shareUrl && (
          <div style={{ marginTop: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', fontSize: '12px', wordBreak: 'break-all' }}>
            <strong>Public Share URL copied to clipboard!</strong><br />
            <span style={{ color: '#596375' }}>{shareUrl}</span>
            {getUrlLengthWarning(shareUrl) && <p style={{ color: '#d97706', marginTop: '6px' }}>{getUrlLengthWarning(shareUrl)}</p>}
          </div>
        )}
        <div style={{ height: '40px' }} />
      </div>

      <div style={{ flex: '1 1 45%', overflowY: 'auto', padding: '20px', background: '#f8f9fb', color: '#222b38', fontFamily: '"Fira Code", "Cascadia Code", monospace', fontSize: '12px', lineHeight: '1.6', borderLeft: '1px solid #e5e8ee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
          <span style={{ color: '#9ca3af', fontSize: '11px' }}>JSON Preview (auto-updates as you type)</span>
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))} style={{ background: '#fff', border: '1px solid #d8dde6', color: '#596375', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Copy JSON</button>
        </div>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

function WorkExperienceForm({ index, job, onChange, onRemove }: { index: number; job: WorkExperienceItem; onChange: (u: WorkExperienceItem) => void; onRemove: () => void }) {
  const updateField = (field: keyof WorkExperienceItem, value: string | string[]) => onChange({ ...job, [field]: value });
  return (
    <div style={nestedFormStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '13px', color: '#596375' }}>Job #{index + 1}</strong>
        <button onClick={onRemove} style={removeButtonStyle}>Remove</button>
      </div>
      <FieldInput label="Job Title" value={job.title} onChange={(v) => updateField('title', v)} />
      <FieldInput label="Company" value={job.company} onChange={(v) => updateField('company', v)} />
      <FieldInput label="Period" value={job.period} onChange={(v) => updateField('period', v)} />
      <FieldInput label="Tech Stack" value={job.techStack ?? ''} onChange={(v) => updateField('techStack', v)} />
      <label style={labelStyle}>Responsibilities (one per line)</label>
      <textarea value={job.responsibilities.join('\n')} onChange={(e) => updateField('responsibilities', e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
      <label style={labelStyle}>Achievements (one per line, optional)</label>
      <textarea value={(job.achievements ?? []).join('\n')} onChange={(e) => updateField('achievements', e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
    </div>
  );
}

function EducationForm({ index, edu, onChange, onRemove }: { index: number; edu: EducationItem; onChange: (u: EducationItem) => void; onRemove: () => void }) {
  const updateField = (field: keyof EducationItem, value: string) => onChange({ ...edu, [field]: value });
  return (
    <div style={nestedFormStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '13px', color: '#596375' }}>Education #{index + 1}</strong>
        <button onClick={onRemove} style={removeButtonStyle}>Remove</button>
      </div>
      <FieldInput label="Degree" value={edu.degree} onChange={(v) => updateField('degree', v)} />
      <FieldInput label="Field" value={edu.field} onChange={(v) => updateField('field', v)} />
      <FieldInput label="Institution" value={edu.institution} onChange={(v) => updateField('institution', v)} />
      <FieldInput label="Year" value={edu.year} onChange={(v) => updateField('year', v)} />
      <FieldInput label="Marks (optional)" value={edu.marks ?? ''} onChange={(v) => updateField('marks', v)} />
    </div>
  );
}

function ProjectForm({ index, project, onChange, onRemove }: { index: number; project: ProjectItem; onChange: (u: ProjectItem) => void; onRemove: () => void }) {
  const updateField = (field: keyof ProjectItem, value: string | string[]) => onChange({ ...project, [field]: value });
  return (
    <div style={nestedFormStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '13px', color: '#596375' }}>Project #{index + 1}</strong>
        <button onClick={onRemove} style={removeButtonStyle}>Remove</button>
      </div>
      <FieldInput label="Name" value={project.name} onChange={(v) => updateField('name', v)} />
      <FieldInput label="Duration" value={project.duration ?? ''} onChange={(v) => updateField('duration', v)} />
      <FieldInput label="Tools" value={project.tools ?? ''} onChange={(v) => updateField('tools', v)} />
      <label style={labelStyle}>Description (one point per line)</label>
      <textarea value={(project.description ?? []).join('\n')} onChange={(e) => updateField('description', e.target.value.split('\n').filter((s) => s.trim() !== ''))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#222b38', margin: '24px 0 10px', paddingBottom: '6px', borderBottom: '2px solid #e5e8ee' }}>{title}</h2>;
}

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#596375', marginBottom: '4px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #d8dde6', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const };
const nestedFormStyle: React.CSSProperties = { padding: '14px', marginBottom: '12px', border: '1px solid #e5e8ee', borderRadius: '8px', background: '#fafbfc' };
const removeButtonStyle: React.CSSProperties = { background: 'none', border: '1px solid #fecaca', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' };
const addButtonStyle: React.CSSProperties = { width: '100%', padding: '8px', border: '2px dashed #d8dde6', borderRadius: '6px', background: 'none', color: '#596375', fontSize: '13px', cursor: 'pointer', marginTop: '4px' };

function fieldLabel(field: string): string {
  const labels: Record<string, string> = { name: 'Full Name', title: 'Job Title', phone: 'Phone', email: 'Email', location: 'Location', experience: 'Experience', linkedin: 'LinkedIn URL', github: 'GitHub URL' };
  return labels[field] ?? field;
}
