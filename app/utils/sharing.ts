import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import type { ResumeData } from '../types/resume';

export function encodeResumeForUrl(data: ResumeData): string {
  const jsonString = JSON.stringify(data);
  return compressToEncodedURIComponent(jsonString);
}

export function decodeResumeFromUrl(encoded: string): ResumeData | null {
  try {
    const jsonString = decompressFromEncodedURIComponent(encoded);
    if (!jsonString) return null;
    const data = JSON.parse(jsonString) as ResumeData;
    if (!data.personalInfo || !data.skills) return null;
    return data;
  } catch (err) {
    console.error('Failed to decode resume from URL:', err);
    return null;
  }
}

export function generateShareUrl(
  data: ResumeData,
  templateId: string = 'classic'
): string {
  const encoded = encodeResumeForUrl(data);
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return base + '/share?d=' + encoded + '&t=' + templateId;
}

export function getUrlLengthWarning(url: string): string | null {
  if (url.length > 10000) return 'This URL is very long. Some platforms may not support it.';
  if (url.length > 5000) return 'This URL is moderately long. It should work in most browsers.';
  return null;
}
