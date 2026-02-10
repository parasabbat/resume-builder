interface AdditionalInfoProps {
  languages?: string[];
}

export default function AdditionalInfo({ languages }: AdditionalInfoProps) {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <p className="languages">
      {/* PATTERN: || for fallback value */}
      <strong>Languages:</strong> {languages.join(', ') || 'Not specified'}
    </p>
  );
}
