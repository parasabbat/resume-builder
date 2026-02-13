import FieldInput from './FieldInput';
import SectionHeading from './SectionHeading';
import { Resume, Certification } from '@/app/types';
import styles from '../editor/forms.module.css';
import inputStyles from '../editor/inputs.module.css';

// REACT CONCEPT: Repeating Items Pattern
// - Similar to WorkExperienceSection but simpler (fewer fields)
// - Shows how pattern scales to different data structures
// - Each certification is a lightweight object

interface CertificationsSectionProps {
  resume: Resume;
  onUpdate: (field: keyof Resume, value: any) => void;
}

export default function CertificationsSection({
  resume,
  onUpdate,
}: CertificationsSectionProps) {
  const handleAddCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialUrl: '',
    };

    onUpdate('certifications', [...resume.certifications, newCert]);
  };

  const handleUpdateCertification = (
    index: number,
    field: keyof Certification,
    value: any
  ) => {
    const updated = resume.certifications.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate('certifications', updated);
  };

  const handleRemoveCertification = (index: number) => {
    const updated = resume.certifications.filter((_, i) => i !== index);
    onUpdate('certifications', updated);
  };

  return (
    <div className={styles.formSection}>
      <SectionHeading
        title="Certifications"
        subtitle={`${resume.certifications.length} certification${resume.certifications.length !== 1 ? 's' : ''}`}
      />

      {resume.certifications.map((item, index) => (
        <div key={item.id || index} className={styles.nestedForm}>
          <div className={styles.nestedFormHeader}>
            <h4 className={styles.nestedFormTitle}>{item.name || 'New Certification'}</h4>
            <button
              type="button"
              onClick={() => handleRemoveCertification(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>

          <FieldInput
            label="Certification Name"
            value={item.name}
            onChange={(value) => handleUpdateCertification(index, 'name', value)}
            placeholder="AWS Certified Developer"
            required
          />

          <FieldInput
            label="Issuer/Organization"
            value={item.issuer}
            onChange={(value) => handleUpdateCertification(index, 'issuer', value)}
            placeholder="Amazon Web Services"
            required
          />

          <div className={inputStyles.twoColumnRow}>
            <FieldInput
              label="Issue Date"
              type="month"
              value={item.issueDate}
              onChange={(value) => handleUpdateCertification(index, 'issueDate', value)}
            />

            <FieldInput
              label="Expiry Date"
              type="month"
              value={item.expiryDate || ''}
              onChange={(value) => handleUpdateCertification(index, 'expiryDate', value)}
              placeholder="Leave blank if no expiry"
            />
          </div>

          <FieldInput
            label="Credential URL"
            type="url"
            value={item.credentialUrl}
            onChange={(value) => handleUpdateCertification(index, 'credentialUrl', value)}
            placeholder="https://credentials.example.com"
          />
        </div>
      ))}

      <button onClick={handleAddCertification} className={styles.addItemButton}>
        + Add Certification
      </button>
    </div>
  );
}
