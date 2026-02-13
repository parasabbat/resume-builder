import FieldInput from './FieldInput';
import TextAreaInput from './TextAreaInput';
import { WorkExperienceItem } from '@/app/types';
import styles from '../editor/forms.module.css';
import inputStyles from '../editor/inputs.module.css';

// REACT CONCEPT: Nested Form Component
// - Manages single item from array
// - Receives item + index + parent callback
// - Parent handles add/remove/update logic
// - Item only handles its own edits

interface WorkItemFormProps {
  item: WorkExperienceItem;
  index: number;
  onUpdate: (index: number, field: keyof WorkExperienceItem, value: any) => void;
  onRemove: (index: number) => void;
}

export default function WorkItemForm({
  item,
  index,
  onUpdate,
  onRemove,
}: WorkItemFormProps) {
  return (
    <div className={styles.nestedForm}>
      {/* Item header with remove button */}
      <div className={styles.nestedFormHeader}>
        <h4 className={styles.nestedFormTitle}>
          {item.title || 'New Position'} at {item.company || 'Company Name'}
        </h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className={styles.removeButton}
        >
          Remove
        </button>
      </div>

      {/* REACT CONCEPT: Controlled Input Pattern
          - Each field update goes: onChange → onUpdate(index, field, value)
          - Parent array handler receives update with index
          - Enables adding/removing/reordering items easily */}

      <FieldInput
        label="Company"
        value={item.company}
        onChange={(value) => onUpdate(index, 'company', value)}
        placeholder="Your Company"
        required
      />

      <FieldInput
        label="Position/Title"
        value={item.title}
        onChange={(value) => onUpdate(index, 'title', value)}
        placeholder="Senior Developer"
        required
      />

      <FieldInput
        label="Period"
        value={item.period}
        onChange={(value) => onUpdate(index, 'period', value)}
        placeholder="Jan 2020 - Present"
        required
      />

      <FieldInput
        label="Tech Stack"
        value={item.techStack || ''}
        onChange={(value) => onUpdate(index, 'techStack', value)}
        placeholder="React, TypeScript, Node.js"
      />

      <TextAreaInput
        label="Responsibilities"
        value={item.responsibilities.join('\n')}
        onChange={(value) =>
          onUpdate(
            index,
            'responsibilities',
            value
              .split('\n')
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
          )
        }
        placeholder="Led development of new features&#10;Mentored junior developers&#10;Improved performance by 40%"
        rows={3}
      />

      <TextAreaInput
        label="Achievements"
        value={(item.achievements || []).join('\n')}
        onChange={(value) =>
          onUpdate(
            index,
            'achievements',
            value
              .split('\n')
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
          )
        }
        placeholder="Won best project award&#10;Deployed to production with 99.9% uptime"
        rows={2}
      />
    </div>
  );
}
