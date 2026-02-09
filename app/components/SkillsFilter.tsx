interface SkillsFilterProps {
  skills: string[];
}

export default function SkillsFilter({ skills }: SkillsFilterProps) {
  return (
    <p className="skills-text">
      {skills.join(', ')}
    </p>
  );
}
