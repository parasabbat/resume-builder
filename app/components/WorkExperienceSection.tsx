import WorkItemForm from './WorkItemForm';
import SectionHeading from './SectionHeading';
import { Resume, WorkExperience } from '@/app/types';
import styles from '../editor/forms.module.css';

// REACT CONCEPT: Array State Management
// - Add items: create new, append to array, update state
// - Remove items: filter out by index
// - Update items: map array, replace at index, update state
// - Always spread (...) to create new array reference
//   (React detects change via new array reference, not contents)

interface WorkExperienceSectionProps {
  resume: Resume;
  onUpdate: (field: keyof Resume, value: any) => void;
}

export default function WorkExperienceSection({
  resume,
  onUpdate,
}: WorkExperienceSectionProps) {
  // Add new work item
  const handleAddWork = () => {
    const newWork: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };

    onUpdate('workExperience', [...resume.workExperience, newWork]);
  };

  // Update specific field in specific work item
  // REACT CONCEPT: Immutable Array Update
  // - .map() creates new array
  // - Replaces item at index, keeps others
  // - This avoids mutation: workExperience[i].field = value
  const handleUpdateWork = (
    index: number,
    field: keyof WorkExperience,
    value: any
  ) => {
    const updated = resume.workExperience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate('workExperience', updated);
  };

  // Remove work item at index
  const handleRemoveWork = (index: number) => {
    const updated = resume.workExperience.filter((_, i) => i !== index);
    onUpdate('workExperience', updated);
  };

  return (
    <div className={styles.formSection}>
      <SectionHeading
        title="Work Experience"
        subtitle={`${resume.workExperience.length} position${resume.workExperience.length !== 1 ? 's' : ''}`}
      />

      {/* REACT CONCEPT: Rendering Arrays with Keys
          - .map() converts array to components
          - index parameter used for key (non-ideal but works here)
          - Each item gets its own component tree */}
      {resume.workExperience.map((item, index) => (
        <WorkItemForm
          key={item.id || index}
          item={item}
          index={index}
          onUpdate={handleUpdateWork}
          onRemove={handleRemoveWork}
        />
      ))}

      <button onClick={handleAddWork} className={styles.addItemButton}>
        + Add Work Experience
      </button>
    </div>
  );
}
