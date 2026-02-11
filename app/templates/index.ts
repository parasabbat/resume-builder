import type { ComponentType } from 'react';
import type { ResumeData } from '../types/resume';
import ClassicTemplate from './classic/ClassicTemplate';

export interface TemplateProps {
  data: ResumeData;
}

const TEMPLATES: Record<string, ComponentType<TemplateProps>> = {
  classic: ClassicTemplate,
};

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean, professional layout with sections and borders',
  },
];

export function getTemplate(id: string): ComponentType<TemplateProps> {
  return TEMPLATES[id] ?? TEMPLATES['classic'];
}

export default TEMPLATES;
