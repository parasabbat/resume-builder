import styles from './inputs.module.css';

// REACT CONCEPT: Controlled Components
// - Component controlled by parent via value prop
// - onChange callback bubbles updates to parent
// - This follows React's "single source of truth" pattern

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  error?: string;
}

export default function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  disabled = false,
  error,
}: FieldInputProps) {
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>
        {label}
        {!required && <span className={styles.labelOptional}> (optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
