interface Project {
  name: string;
  duration?: string;
  description?: string[];
  tools?: string;
}

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  // PATTERN 1: Early return
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div>
      {projects.map((project) => (
        <article key={project.name} className="project-item">
          <p className="project-header">
            <strong>{project.name}</strong>
            {/* PATTERN 2: && for optional inline content */}
            {project.duration && ` – ${project.duration}`}
          </p>

          {/* PATTERN 3: && for optional arrays */}
          {project.description && project.description.length > 0 && (
            <ul className="project-description">
              {project.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          )}

          {/* PATTERN 4: && for optional strings */}
          {project.tools && (
            <p className="project-tools">
              <strong>Tools:</strong> {project.tools}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
