import styles from '../editor/inputs.module.css';

// REACT CONCEPT: Controlled Textarea Component
// - Same controlled pattern as FieldInput
// - Handles multi-line text input
// - Parent manages value and change events

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
}

export default function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  rows = 4,
}: TextAreaInputProps) {
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>
        {label}
        {!required && <span className={styles.labelOptional}> (optional)</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`${styles.textarea} ${error ? styles.inputError : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
