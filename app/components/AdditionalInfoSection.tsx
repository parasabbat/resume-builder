import TextAreaInput from './TextAreaInput';
import SectionHeading from './SectionHeading';
import { ResumeData } from '@/app/types';
import styles from '../editor/forms.module.css';

interface AdditionalInfoSectionProps {
  resume: ResumeData;
  onUpdate: (field: keyof ResumeData, value: any) => void;
}

export default function AdditionalInfoSection({
  resume,
  onUpdate,
}: AdditionalInfoSectionProps) {
  return (
    <div className={styles.formSection}>
      <SectionHeading title="Additional Information" />

      <TextAreaInput
        label="Languages"
        value={(resume.additionalInfo?.languages || []).join('\n')}
        onChange={(value) =>
          onUpdate('additionalInfo', {
            ...resume.additionalInfo,
            languages: value
              .split('\n')
              .map((s) => s.trim())
              .filter((s) => s.length > 0),
          })
        }
        placeholder="English (Native)&#10;Spanish (Fluent)&#10;Mandarin (Basic)"
        rows={3}
      />
    </div>
  );
}
