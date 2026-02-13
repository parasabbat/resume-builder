import type { ResumeData, SavedResume } from '../types/resume';
import defaultData from '../../data/data.json';

const STORAGE_KEY = 'resume_builder_files';

export function getAllResumes(): SavedResume[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedResume[];
  } catch {
    console.error('Failed to parse saved resumes.');
    return [];
  }
}

export function getResumeById(id: string): SavedResume | undefined {
  return getAllResumes().find((r) => r.id === id);
}

function saveAll(resumes: SavedResume[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

export function createResume(
  name: string = 'Untitled Resume',
  data?: ResumeData
): SavedResume {
  const newResume: SavedResume = {
    id: crypto.randomUUID(),
    name,
    updatedAt: new Date().toISOString(),
    templateId: 'classic',
    data: data ?? (defaultData as ResumeData),
  };
  const all = getAllResumes();
  all.push(newResume);
  saveAll(all);
  return newResume;
}

export function updateResume(
  id: string,
  updates: Partial<Omit<SavedResume, 'id'>>
): SavedResume | undefined {
  const all = getAllResumes();
  let updated: SavedResume | undefined;
  const newAll = all.map((r) => {
    if (r.id === id) {
      updated = { ...r, ...updates, updatedAt: new Date().toISOString() };
      return updated;
    }
    return r;
  });
  if (updated) saveAll(newAll);
  return updated;
}

export function deleteResume(id: string): void {
  const all = getAllResumes();
  saveAll(all.filter((r) => r.id !== id));
}

export function duplicateResume(id: string): SavedResume | undefined {
  const original = getResumeById(id);
  if (!original) return undefined;
  const clonedData: ResumeData = JSON.parse(JSON.stringify(original.data));
  return createResume(original.name + ' (Copy)', clonedData);
}

export function exportResume(id: string): void {
  const resume = getResumeById(id);
  if (!resume) return;
  const jsonString = JSON.stringify(resume.data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = resume.name.replace(/\s+/g, '_') + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importResume(file: File): Promise<SavedResume> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text) as ResumeData;
        if (!data.personalInfo || !data.skills || !data.workExperience) {
          throw new Error('Invalid resume JSON: missing required fields');
        }
        const name = file.name.replace(/\.json$/i, '') || 'Imported Resume';
        resolve(createResume(name, data));
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
