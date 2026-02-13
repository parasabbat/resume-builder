import { ResumeData } from '@/app/types';
import styles from '../editor/forms.module.css';

// REACT CONCEPT: Display/Read-only Component
// - Shows live JSON preview of resume data
// - Updates automatically when form changes
// - Includes copy-to-clipboard functionality
// - Uses <pre> tag for monospace formatting

interface JsonPreviewProps {
  resume: ResumeData;
  onCopy: () => void;
  copySuccess?: boolean;
}

export default function JsonPreview({
  resume,
  onCopy,
  copySuccess = false,
}: JsonPreviewProps) {
  // Format JSON with indentation for readability
  const jsonString = JSON.stringify(resume, null, 2);

  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>JSON Preview</span>
        <button
          type="button"
          onClick={onCopy}
          className={styles.copyJsonButton}
        >
          {copySuccess ? '✓ Copied!' : 'Copy JSON'}
        </button>
      </div>

      {/* REACT CONCEPT: Dynamic Content
          - <pre> tag preserves formatting
          - Monospace font shows JSON structure
          - Updates automatically via props */}
      <pre className={styles.jsonPreview}>{jsonString}</pre>
    </div>
  );
}
