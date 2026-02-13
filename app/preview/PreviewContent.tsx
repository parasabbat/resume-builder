'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ResumeData } from '../types/resume';
import { getResumeById } from '../utils/storage';
import { generateShareUrl } from '../utils/sharing';
import { getTemplate, TEMPLATE_OPTIONS } from '../templates';
import defaultData from '../../data/data.json';
import PrintButton from '../components/PrintButton';
import DocumentTitle from '../components/DocumentTitle';
import styles from './preview.module.css';
import toolbarStyles from './toolbar.module.css';

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

  const handleShare = () => {
    const url = generateShareUrl(data, templateId);
    setShareUrl(url);
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <DocumentTitle name={data.personalInfo.name} title={data.personalInfo.title} />

      {/* Toolbar - hidden in print */}
      <div className={toolbarStyles.toolbar}>
        <div className={toolbarStyles.toolbarLeft}>
          <PrintButton />
          {resumeId && (
            <button
              onClick={() => router.push(`/editor?id=${resumeId}`)}
              className={`${toolbarStyles.button} ${toolbarStyles.buttonPrimary}`}
            >
              <svg className={toolbarStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          )}
          <button
            onClick={handleShare}
            className={`${toolbarStyles.button} ${toolbarStyles.buttonSecondary}`}
          >
            <svg className={toolbarStyles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Public Share
          </button>
        </div>
        <div className={toolbarStyles.toolbarRight}>
          <div className={toolbarStyles.templateSelector}>
            Template:
            <select value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
              {TEMPLATE_OPTIONS.map((opt) => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {shareUrl && (
        <div className={`${styles.successMessage} ${styles.hidePrint}`}>
          Public Share link copied to clipboard!
        </div>
      )}

      {/* A4 paper simulation - matches print output exactly */}
      <div className={styles.container}>
        <div className={styles.paperPreview}>
          {React.createElement(getTemplate(templateId), { data })}
        </div>
      </div>

      {/* Actual content for print - hidden on screen, shown in print */}
      <div className="print-only">
        {React.createElement(getTemplate(templateId), { data })}
      </div>
    </>
  );
}
