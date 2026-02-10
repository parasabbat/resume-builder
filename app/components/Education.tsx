interface EducationItem {
  year: string;
  degree: string;
  field: string;
  institution: string;
  marks?: string;  // Optional field
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  return (
    <div>
      {education.map((edu) => (
        <article key={`${edu.institution}-${edu.year}`} className="education-item">
          <p className="education-degree">
            <strong>{edu.degree}</strong> – {edu.field}
          </p>
          <p className="education-institution">{edu.institution}</p>
          
          {/* 
            PATTERN: Ternary ? : for conditional text
            If marks exists, show "Year | Marks: X%"
            Otherwise, just show "Year"
          */}
          <p className="education-year">
            {edu.marks 
              ? `${edu.year} | Marks: ${edu.marks}` 
              : edu.year
            }
          </p>
        </article>
      ))}
    </div>
  );
}
