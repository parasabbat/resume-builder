'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ResumeData } from '../types/resume';
import { getResumeById } from '../utils/storage';
import { generateShareUrl } from '../utils/sharing';
import { getTemplate, TEMPLATE_OPTIONS } from '../templates';
import defaultData from '../../data/data.json';
import PrintButton from '../components/PrintButton';
import DocumentTitle from '../components/DocumentTitle';

export default function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get('id');

  const [data, setData] = useState<ResumeData>(defaultData as ResumeData);
  const [templateId, setTemplateId] = useState('classic');
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    if (resumeId) {
      const saved = getResumeById(resumeId);
      if (saved) {
        setData(saved.data);
        setTemplateId(saved.templateId);
      }
    }
  }, [resumeId]);

  const Template = getTemplate(templateId);

  const handleShare = () => {
    const url = generateShareUrl(data, templateId);
    setShareUrl(url);
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <DocumentTitle name={data.personalInfo.name} title={data.personalInfo.title} />

      {/* Toolbar - hidden in print */}
      <div className="no-print" style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 20px',
        borderBottom: '1px solid #e5e8ee',
        background: '#fafbfc',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <PrintButton />
        {resumeId && (
          <button onClick={() => router.push(`/editor?id=${resumeId}`)} style={toolbarButtonStyle}>
            Edit
          </button>
        )}
        <button onClick={handleShare} style={toolbarButtonStyle}>
          Public Share
        </button>
        <label style={{ marginLeft: 'auto', fontSize: '13px', color: '#596375', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Template:
          <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d8dde6', fontSize: '13px' }}>
            {TEMPLATE_OPTIONS.map((opt) => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
        </label>
      </div>

      {shareUrl && (
        <div className="no-print" style={{ padding: '10px 20px', background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', fontSize: '13px', color: '#166534' }}>
          Public Share link copied to clipboard!
        </div>
      )}

      {/* A4 paper simulation - matches print output exactly */}
      <div className="no-print" style={{
        background: '#e8eaed',
        minHeight: 'calc(100vh - 100px)',
        padding: '32px 0',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className="print-preview-page" style={{
          width: '210mm',
          minHeight: '297mm',
          background: '#fff',
          boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
          padding: '14mm 12mm',
          boxSizing: 'border-box',
        }}>
          <Template data={data} />
        </div>
      </div>

      {/* Actual content for print - hidden on screen, shown in print */}
      <div className="print-only">
        <Template data={data} />
      </div>
    </>
  );
}

const toolbarButtonStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '6px',
  border: '1px solid #d8dde6',
  background: '#fff',
  color: '#333',
  fontSize: '13px',
  cursor: 'pointer',
};
