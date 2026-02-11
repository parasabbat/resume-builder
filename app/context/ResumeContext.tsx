'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { ResumeData } from '../types/resume';
import defaultData from '../../data/data.json';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateResumeData: (partial: Partial<ResumeData>) => void;
  templateId: string;
  setTemplateId: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

interface ResumeProviderProps {
  children: ReactNode;
  initialData?: ResumeData;
  initialTemplateId?: string;
}

export function ResumeProvider({
  children,
  initialData,
  initialTemplateId = 'classic',
}: ResumeProviderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(
    initialData ?? (defaultData as ResumeData)
  );
  const [templateId, setTemplateId] = useState(initialTemplateId);

  const updateResumeData = useCallback((partial: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...partial }));
  }, []);

  const value: ResumeContextType = {
    resumeData,
    setResumeData,
    updateResumeData,
    templateId,
    setTemplateId,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume(): ResumeContextType {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error(
      'useResume() must be used inside a <ResumeProvider>.'
    );
  }
  return context;
}
