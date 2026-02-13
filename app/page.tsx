/**
 * DASHBOARD PAGE (/)
 * 
 * Main landing page showing all saved resumes as cards
 * Users can: create, edit, preview, duplicate, export, import, delete resumes
 * 
 * REFACTORED FOR:
 * - Separation of concerns (this file handles list, ResumeCard handles card)
 * - CSS Modules (styles in separate files)
 * - Clean, readable code (90 lines instead of 360+)
 * 
 * REACT CONCEPTS:
 *   - 'use client': Needed for hooks and browser APIs
 *   - useState: Managing resumes list and loading state
 *   - useEffect: Loading data from localStorage on mount
 *   - useRouter: Navigation to editor page
 *   - useRef: Reference to hidden file input for import
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { SavedResume } from './types/resume';
import {
  getAllResumes,
  createResume,
  importResume,
} from './utils/storage';
import ResumeCard from './components/ResumeCard';
import styles from './dashboard.module.css';

/**
 * Main Dashboard Component
 */
export default function DashboardPage() {
  // ===== STATE =====
  // REACT CONCEPT: useState
  // Stores the list of resumes and loading state
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ===== REFS =====
  // REACT CONCEPT: useRef
  // Creates a reference to the hidden file input element
  // Used to programmatically trigger file picker when user clicks Import button
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== ROUTER =====
  // NEXT.JS CONCEPT: useRouter
  // Provides navigation methods (push, back, replace)
  const router = useRouter();

  // ===== SIDE EFFECTS =====
  // REACT CONCEPT: useEffect
  // Runs once when component mounts ([] dependency array)
  // Loads all saved resumes from localStorage
  useEffect(() => {
    setResumes(getAllResumes());
    setIsLoading(false);
  }, []);

  // ===== HELPER FUNCTIONS =====

  /**
   * Refresh the resumes list from localStorage
   * Called after destructive operations (delete, duplicate)
   */
  const refreshList = () => {
    setResumes(getAllResumes());
  };

  /**
   * Create new resume and navigate to editor
   * FLOW:
   * 1. Call createResume() which creates new SavedResume in localStorage
   * 2. Refresh the list to show new resume
   * 3. Navigate to /editor?id=xxx to start editing
   */
  const handleCreate = () => {
    const newResume = createResume();
    refreshList();
    router.push(`/editor?id=${newResume.id}`);
  };

  /**
   * Import resume from JSON file
   * Step 1: Programmatically click hidden file input
   */
  const handleImportClick = () => {
    fileInputRef.current?.click(); // ?. = optional chaining (safe access)
  };

  /**
   * Import resume from JSON file
   * Step 2: Handle file selection
   * FLOW:
   * 1. Get selected file from input element
   * 2. Call importResume() which reads file and creates new resume in localStorage
   * 3. Refresh list to show imported resume
   * 4. Reset file input value so same file can be imported again
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // ?. = optional chaining
    if (!file) return;

    try {
      await importResume(file);
      refreshList();
    } catch (err) {
      alert(`Failed to import: ${(err as Error).message}`);
    }

    e.target.value = ''; // Reset input
  };

  // ===== RENDER =====

  // Loading state
  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  // Main page
  return (
    <div className={styles.container}>
      {/* PAGE HEADER - Title and action buttons */}
      <div className={styles.header}>
        <h1 className={styles.title}>My Resumes</h1>
        <div className={styles.headerActions}>
          {/* Create new resume button */}
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleCreate}
          >
            + New Resume
          </button>

          {/* Import JSON button */}
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleImportClick}
          >
            Import JSON
          </button>

          {/* Hidden file input - triggered by Import button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* EMPTY STATE - Shown when no resumes exist */}
      {resumes.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>No resumes yet</p>
          <p className={styles.emptyStateDescription}>
            Create your first resume or import an existing JSON file
          </p>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleCreate}
          >
            + Create Your First Resume
          </button>
        </div>
      )}

      {/* RESUME CARDS GRID - Displays all resumes */}
      <div className={styles.grid}>
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            onAction={refreshList} // Pass callback for after delete/duplicate
          />
        ))}
      </div>

      {/* FOOTER */}
      <p className={styles.footer}></p>
    </div>
  );
}
