/**
 * RESUME CARD COMPONENT
 * 
 * Single Responsibility: Display ONE resume card with its actions
 * 
 * REACT CONCEPTS TAUGHT:
 *   - 'use client': This component uses hooks and event handlers
 *   - Props: Receives resume data and callback from parent
 *   - Event handlers: onClick handlers for each button
 *   - useRouter: For navigation to edit/preview pages
 *   - CSS Modules: Scoped styles imported as objects
 *   - Event propagation: stopPropagation() to prevent bubbling
 * 
 * PROPS EXPLANATION:
 *   - resume: The SavedResume object to display
 *   - onAction: Callback function parent calls to refresh list
 *              (called after delete/duplicate operations)
 */

'use client';

import { useRouter } from 'next/navigation';
import type { SavedResume } from '../types/resume';
import {
  deleteResume,
  duplicateResume,
  exportResume,
} from '../utils/storage';
import styles from './ResumeCard.module.css';

interface ResumeCardProps {
  resume: SavedResume;
  onAction: () => void; // Callback to refresh parent list
}

/**
 * ResumeCard Component
 * 
 * Displays a single resume as a card with:
 * - Resume name (title)
 * - Person name and job title
 * - Last updated date
 * - Action buttons (Edit, Preview, Duplicate, Export, Delete)
 */
export default function ResumeCard({ resume, onAction }: ResumeCardProps) {
  // NEXT.JS CONCEPT: useRouter
  // Used for programmatic navigation (pushing to editor/preview)
  const router = useRouter();

  // ===== EVENT HANDLERS =====
  // Each handler performs an action and may trigger parent refresh

  /**
   * HANDLE EDIT
   * Navigate to the editor page with this resume's ID
   * Uses URL parameter: /editor?id=123
   */
  const handleEdit = () => {
    router.push(`/editor?id=${resume.id}`);
  };

  /**
   * HANDLE PREVIEW
   * Navigate to the preview page with this resume's ID
   * Uses URL parameter: /preview?id=123
   */
  const handlePreview = () => {
    router.push(`/preview?id=${resume.id}`);
  };

  /**
   * HANDLE DUPLICATE
   * Create a copy of this resume in localStorage
   * Then call parent's onAction() to refresh the list
   */
  const handleDuplicate = () => {
    duplicateResume(resume.id);
    onAction(); // Tells parent to refetch and re-render list
  };

  /**
   * HANDLE EXPORT
   * Download this resume as a JSON file
   */
  const handleExport = () => {
    exportResume(resume.id);
  };

  /**
   * HANDLE DELETE
   * Show confirmation dialog, then delete if confirmed
   * Then call parent's onAction() to refresh the list
   */
  const handleDelete = () => {
    // window.confirm returns true if user clicks OK, false if Cancel
    if (window.confirm(`Delete "${resume.name}"? This cannot be undone.`)) {
      deleteResume(resume.id);
      onAction(); // Tells parent to refetch and re-render list
    }
  };

  // ===== RENDER =====
  return (
    <div
      className={styles.card}
      onClick={handleEdit} // Click card to edit (primary action)
    >
      {/* Resume name (user-given title like "My Resume" or "John Doe - 2025") */}
      <h3 className={styles.cardTitle}>{resume.name}</h3>

      {/* Person info: "John Doe — Senior Developer" */}
      <p className={styles.personInfo}>
        {resume.data.personalInfo.name} — {resume.data.personalInfo.title}
      </p>

      {/* Last updated timestamp */}
      <p className={styles.updatedTime}>
        Updated: {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      {/* Action buttons container */}
      <div
        className={styles.actionButtonsContainer}
        onClick={(e) => e.stopPropagation()} // IMPORTANT: Prevent card click when clicking buttons
      >
        {/* EDIT BUTTON - Primary action (blue) */}
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={handleEdit}
          title="Edit this resume"
        >
          Edit
        </button>

        {/* PREVIEW BUTTON - Secondary action (green) */}
        <button
          className={`${styles.actionButton} ${styles.previewButton}`}
          onClick={handlePreview}
          title="Preview this resume"
        >
          Preview
        </button>

        {/* DUPLICATE BUTTON - Neutral action (gray) */}
        <button
          className={styles.actionButton}
          onClick={handleDuplicate}
          title="Create a copy of this resume"
        >
          Duplicate
        </button>

        {/* EXPORT BUTTON - Neutral action (gray) */}
        <button
          className={styles.actionButton}
          onClick={handleExport}
          title="Download as JSON file"
        >
          Export
        </button>

        {/* DELETE BUTTON - Destructive action (red) */}
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={handleDelete}
          title="Delete this resume permanently"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
