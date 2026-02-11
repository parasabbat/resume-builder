'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ResumeData } from '../types/resume';
import { decodeResumeFromUrl } from '../utils/sharing';
import { getTemplate } from '../templates';
import PrintButton from '../components/PrintButton';
import DocumentTitle from '../components/DocumentTitle';

export default function ShareContent() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get('d');
  const templateId = searchParams.get('t') ?? 'classic';

  const [data, setData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!encodedData) {
      setError('No resume data found in the URL. The link may be incomplete.');
      return;
    }
    const decoded = decodeResumeFromUrl(encodedData);
    if (decoded) {
      setData(decoded);
    } else {
      setError('Failed to decode the resume data. The link may be corrupted.');
    }
  }, [encodedData]);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (error) {
    return (
      <div style={{ maxWidth: '500px', margin: '60px auto', padding: '30px', textAlign: 'center', border: '1px solid #fecaca', borderRadius: '12px', background: '#fef2f2' }}>
        <h2 style={{ color: '#dc2626', fontSize: '18px', marginBottom: '8px' }}>Unable to Load Resume</h2>
        <p style={{ color: '#991b1b', fontSize: '14px' }}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#596375' }}>Decoding resume...</div>;
  }

  const Template = getTemplate(templateId);

  return (
    <>
      <DocumentTitle name={data.personalInfo.name} title={data.personalInfo.title} />

      {/* Toolbar */}
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

        {/* Copy contact buttons */}
        <button onClick={() => handleCopy(data.personalInfo.phone, 'Phone')} style={copyBtnStyle}>
          {copiedField === 'Phone' ? 'Copied!' : 'Copy Phone'}
        </button>
        <button onClick={() => handleCopy(data.personalInfo.email, 'Email')} style={copyBtnStyle}>
          {copiedField === 'Email' ? 'Copied!' : 'Copy Email'}
        </button>

        {/* Trust indicator */}
        <span style={{
          marginLeft: 'auto', fontSize: '12px', color: '#16a34a',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          {'\u{1F512} Shared via URL \u2014 no data stored on any server'}
        </span>
      </div>

      {/* A4 paper simulation - same as preview */}
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

      {/* Actual content for print */}
      <div className="print-only">
        <Template data={data} />
      </div>
    </>
  );
}

const copyBtnStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '6px',
  border: '1px solid #d8dde6',
  background: '#fff',
  color: '#333',
  fontSize: '13px',
  cursor: 'pointer',
};
