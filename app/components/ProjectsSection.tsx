import ProjectItemForm from './ProjectItemForm';
import SectionHeading from './SectionHeading';
import { Resume, Project } from '@/app/types';
import styles from '../editor/forms.module.css';

interface ProjectsSectionProps {
  resume: Resume;
  onUpdate: (field: keyof Resume, value: any) => void;
}

export default function ProjectsSection({
  resume,
  onUpdate,
}: ProjectsSectionProps) {
  const handleAddProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      url: '',
      technologies: '',
    };

    onUpdate('projects', [...resume.projects, newProject]);
  };

  const handleUpdateProject = (index: number, field: keyof Project, value: any) => {
    const updated = resume.projects.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate('projects', updated);
  };

  const handleRemoveProject = (index: number) => {
    const updated = resume.projects.filter((_, i) => i !== index);
    onUpdate('projects', updated);
  };

  return (
    <div className={styles.formSection}>
      <SectionHeading
        title="Projects"
        subtitle={`${resume.projects.length} project${resume.projects.length !== 1 ? 's' : ''}`}
      />

      {resume.projects.map((item, index) => (
        <ProjectItemForm
          key={item.id || index}
          item={item}
          index={index}
          onUpdate={handleUpdateProject}
          onRemove={handleRemoveProject}
        />
      ))}

      <button onClick={handleAddProject} className={styles.addItemButton}>
        + Add Project
      </button>
    </div>
  );
}
