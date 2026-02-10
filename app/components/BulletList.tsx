interface BulletListProps {
  items?: string[];
  className?: string;
}

export default function BulletList({ items, className = "" }: BulletListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
