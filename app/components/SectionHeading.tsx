import styles from '../editor/forms.module.css';

// REACT CONCEPT: Presentational Components
// - Simple components that just render markup
// - No state management, only props
// - Easily reusable across sections

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600, color: '#222b38' }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
