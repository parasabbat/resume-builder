// =============================================================
// page.tsx — Dashboard: List, create, manage resume files
// =============================================================
//
// This is the HOME page ("/"). It shows all saved resumes as cards
// with options to create, duplicate, export, import, and delete.
//
// REACT CONCEPTS TAUGHT:
//   - 'use client': This page uses hooks (useState, useEffect,
//     useRouter) so it must be a Client Component.
//   - useEffect for loading data on mount
//   - useState for managing the list of resumes
//   - Event handlers for CRUD operations
//   - useRouter for programmatic navigation
//   - useRef for the hidden file input (import)
//
// NEXT.JS CONCEPTS:
//   - useRouter().push('/editor?id=xxx') for navigation with params
// =============================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { SavedResume } from './types/resume';
import {
  getAllResumes,
  createResume,
  deleteResume,
  duplicateResume,
  exportResume,
  importResume,
} from './utils/storage';

export default function DashboardPage() {
  // ----- State -----
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ----- Refs -----
  // REACT CONCEPT: useRef
  // useRef gives you a "reference" to a DOM element.
  // We need it to programmatically click the hidden file input.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----- Router -----
  // NEXT.JS CONCEPT: useRouter
  // Gives you navigation methods like push(), back(), replace().
  // router.push('/editor?id=xxx') navigates to the editor page.
  const router = useRouter();

  // ----- Load resumes on mount -----
  useEffect(() => {
    setResumes(getAllResumes());
    setIsLoading(false);
  }, []);

  // ----- Refresh the list from localStorage -----
  const refreshList = () => {
    setResumes(getAllResumes());
  };

  // ----- Create a new resume -----
  const handleCreate = () => {
    const newResume = createResume();
    refreshList();
    // Navigate to the editor with the new resume's ID
    router.push(`/editor?id=${newResume.id}`);
  };

  // ----- Delete a resume (with confirmation) -----
  const handleDelete = (id: string, name: string) => {
    // window.confirm shows a browser dialog: OK / Cancel
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteResume(id);
      refreshList();
    }
  };

  // ----- Duplicate a resume -----
  const handleDuplicate = (id: string) => {
    duplicateResume(id);
    refreshList();
  };

  // ----- Export a resume as .json file -----
  const handleExport = (id: string) => {
    exportResume(id);
  };

  // ----- Import: trigger hidden file input -----
  const handleImportClick = () => {
    fileInputRef.current?.click();
    // ☝️ ?. is "optional chaining" — if fileInputRef.current is null,
    // it does nothing instead of crashing
  };

  // ----- Import: handle the selected file -----
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importResume(file);
      refreshList();
    } catch (err) {
      alert(`Failed to import: ${(err as Error).message}`);
    }

    // Reset the input so the same file can be imported again
    e.target.value = '';
  };

  // ----- Open a resume in the editor -----
  const handleOpen = (id: string) => {
    router.push(`/editor?id=${id}`);
  };

  // ----- Render -----
  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#596375' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
          My Resumes
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleCreate} style={buttonStyle('#1a56db', '#fff')}>
            + New Resume
          </button>
          <button
            onClick={handleImportClick}
            style={buttonStyle('#fff', '#333', '1px solid #d8dde6')}
          >
            Import JSON
          </button>
          {/* Hidden file input for importing */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Empty state */}
      {resumes.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#596375',
            border: '2px dashed #d8dde6',
            borderRadius: '12px',
          }}
        >
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>
            No resumes yet
          </p>
          <p style={{ fontSize: '14px', marginBottom: '20px' }}>
            Create your first resume or import an existing JSON file
          </p>
          <button
            onClick={handleCreate}
            style={buttonStyle('#1a56db', '#fff')}
          >
            + Create Your First Resume
          </button>
        </div>
      )}

      {/* Resume cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {resumes.map((resume) => (
          <div
            key={resume.id}
            style={{
              border: '1px solid #e5e8ee',
              borderRadius: '10px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'box-shadow 0.15s, border-color 0.15s',
              background: '#fff',
            }}
            onClick={() => handleOpen(resume.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 4px 12px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#b0b8c9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e8ee';
            }}
          >
            {/* Card title */}
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                margin: '0 0 4px',
                color: '#222b38',
              }}
            >
              {resume.name}
            </h3>

            {/* Name from resume data */}
            <p
              style={{
                fontSize: '13px',
                color: '#596375',
                margin: '0 0 4px',
              }}
            >
              {resume.data.personalInfo.name} —{' '}
              {resume.data.personalInfo.title}
            </p>

            {/* Last updated */}
            <p
              style={{
                fontSize: '12px',
                color: '#9ca3af',
                margin: '0 0 14px',
              }}
            >
              Updated: {new Date(resume.updatedAt).toLocaleDateString()}
            </p>

            {/* Action buttons */}
            <div
              style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => router.push(`/editor?id=${resume.id}`)}
                style={{
                  ...smallButtonStyle,
                  background: '#1a56db',
                  color: '#fff',
                  border: '1px solid #1a56db',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => router.push(`/preview?id=${resume.id}`)}
                style={{
                  ...smallButtonStyle,
                  background: '#059669',
                  color: '#fff',
                  border: '1px solid #059669',
                }}
              >
                Preview
              </button>
              <button
                onClick={() => handleDuplicate(resume.id)}
                style={smallButtonStyle}
              >
                Duplicate
              </button>
              <button
                onClick={() => handleExport(resume.id)}
                style={smallButtonStyle}
              >
                Export
              </button>
              <button
                onClick={() => handleDelete(resume.id, resume.name)}
                style={{
                  ...smallButtonStyle,
                  color: '#dc2626',
                  borderColor: '#fecaca',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer trust message */}
      <p
        style={{
          textAlign: 'center',
          marginTop: '40px',
          fontSize: '12px',
          color: '#9ca3af',
        }}
      >
        
      </p>
    </div>
  );
}

// =============================================================
// STYLES — Helper functions for inline styles
// =============================================================
//
// In a real app, you'd use Tailwind CSS classes or CSS Modules.
// For learning, inline styles are simpler to understand because
// everything is in one file. We'll refactor to Tailwind later.
//
// React uses camelCase for CSS properties:
//   CSS: background-color → React: backgroundColor
//   CSS: font-size → React: fontSize
// =============================================================

function buttonStyle(
  bg: string,
  color: string,
  border?: string
): React.CSSProperties {
  return {
    padding: '8px 16px',
    borderRadius: '6px',
    border: border || 'none',
    background: bg,
    color,
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  };
}

const smallButtonStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: '4px',
  border: '1px solid #e5e8ee',
  background: '#fafbfc',
  color: '#596375',
  fontSize: '12px',
  cursor: 'pointer',
};
