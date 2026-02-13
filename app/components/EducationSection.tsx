import EducationItemForm from './EducationItemForm';
import SectionHeading from './SectionHeading';
import { Resume, Education } from '@/app/types';
import styles from '../editor/forms.module.css';

interface EducationSectionProps {
  resume: Resume;
  onUpdate: (field: keyof Resume, value: any) => void;
}

export default function EducationSection({
  resume,
  onUpdate,
}: EducationSectionProps) {
  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      additionalInfo: '',
    };

    onUpdate('education', [...resume.education, newEducation]);
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof Education,
    value: any
  ) => {
    const updated = resume.education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate('education', updated);
  };

  const handleRemoveEducation = (index: number) => {
    const updated = resume.education.filter((_, i) => i !== index);
    onUpdate('education', updated);
  };

  return (
    <div className={styles.formSection}>
      <SectionHeading
        title="Education"
        subtitle={`${resume.education.length} degree${resume.education.length !== 1 ? 's' : ''}`}
      />

      {resume.education.map((item, index) => (
        <EducationItemForm
          key={item.id || index}
          item={item}
          index={index}
          onUpdate={handleUpdateEducation}
          onRemove={handleRemoveEducation}
        />
      ))}

      <button onClick={handleAddEducation} className={styles.addItemButton}>
        + Add Education
      </button>
    </div>
  );
}
