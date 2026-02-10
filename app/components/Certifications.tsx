interface CertificationsProps {
  certifications?: string[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  /*
    PATTERN: Early Return
    If no certifications or empty array, don't render anything
  */
  if (!certifications || certifications.length === 0) {
    return null;  // Renders nothing
  }

  return (
    <p className="certifications-text">
      {certifications.join(', ')}
    </p>
  );
}
