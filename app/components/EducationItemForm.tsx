import FieldInput from './FieldInput';
import { Education } from '@/app/types';
import styles from '../editor/forms.module.css';
import inputStyles from '../editor/inputs.module.css';

interface EducationItemFormProps {
  item: Education;
  index: number;
  onUpdate: (index: number, field: keyof Education, value: any) => void;
  onRemove: (index: number) => void;
}

export default function EducationItemForm({
  item,
  index,
  onUpdate,
  onRemove,
}: EducationItemFormProps) {
  return (
    <div className={styles.nestedForm}>
      <div className={styles.nestedFormHeader}>
        <h4 className={styles.nestedFormTitle}>
          {item.degree || 'Degree'} from {item.school || 'School'}
        </h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className={styles.removeButton}
        >
          Remove
        </button>
      </div>

      <FieldInput
        label="School/University"
        value={item.school}
        onChange={(value) => onUpdate(index, 'school', value)}
        placeholder="University Name"
        required
      />

      <FieldInput
        label="Degree"
        value={item.degree}
        onChange={(value) => onUpdate(index, 'degree', value)}
        placeholder="Bachelor of Science"
        required
      />

      <FieldInput
        label="Field of Study"
        value={item.fieldOfStudy}
        onChange={(value) => onUpdate(index, 'fieldOfStudy', value)}
        placeholder="Computer Science"
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
        label="Grade/GPA"
        value={item.gpa}
        onChange={(value) => onUpdate(index, 'gpa', value)}
        placeholder="3.8"
      />

      <FieldInput
        label="Additional Info"
        value={item.additionalInfo}
        onChange={(value) => onUpdate(index, 'additionalInfo', value)}
        placeholder="Honors, activities, etc."
      />
    </div>
  );
}
