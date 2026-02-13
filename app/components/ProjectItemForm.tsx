import FieldInput from './FieldInput';
import TextAreaInput from './TextAreaInput';
import { Project } from '@/app/types';
import styles from '../editor/forms.module.css';
import inputStyles from '../editor/inputs.module.css';

interface ProjectItemFormProps {
  item: Project;
  index: number;
  onUpdate: (index: number, field: keyof Project, value: any) => void;
  onRemove: (index: number) => void;
}

export default function ProjectItemForm({
  item,
  index,
  onUpdate,
  onRemove,
}: ProjectItemFormProps) {
  return (
    <div className={styles.nestedForm}>
      <div className={styles.nestedFormHeader}>
        <h4 className={styles.nestedFormTitle}>{item.name || 'New Project'}</h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className={styles.removeButton}
        >
          Remove
        </button>
      </div>

      <FieldInput
        label="Project Name"
        value={item.name}
        onChange={(value) => onUpdate(index, 'name', value)}
        placeholder="My Awesome Project"
        required
      />

      <TextAreaInput
        label="Description"
        value={item.description}
        onChange={(value) => onUpdate(index, 'description', value)}
        placeholder="What did you build? What problem did it solve?"
        rows={3}
      />

      <div className={inputStyles.twoColumnRow}>
        <FieldInput
          label="Start Date"
          type="month"
          value={item.startDate}
          onChange={(value) => onUpdate(index, 'startDate', value)}
        />

        <FieldInput
          label="End Date"
          type="month"
          value={item.endDate || ''}
          onChange={(value) => onUpdate(index, 'endDate', value)}
          placeholder="Leave blank if ongoing"
        />
      </div>

      <FieldInput
        label="Project URL"
        type="url"
        value={item.url}
        onChange={(value) => onUpdate(index, 'url', value)}
        placeholder="https://github.com/yourname/project"
      />

      <FieldInput
        label="Technologies Used"
        value={item.technologies}
        onChange={(value) => onUpdate(index, 'technologies', value)}
        placeholder="React, TypeScript, Node.js"
      />
    </div>
  );
}
