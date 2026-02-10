import BulletList from "./BulletList";

export interface Job {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  achievements?: string[];
  techStack?: string;
}

interface WorkItemProps {
  job: Job;
  showGap?: boolean;
}

export default function WorkItem({ job, showGap = false }: WorkItemProps) {
  return (
    <article className="work-item">
      <p className="work-header-text">
        <strong>{job.company}</strong> – {job.title}
      </p>
      <p className="work-period-text">{job.period}</p>

      <BulletList items={job.responsibilities} className="work-responsibilities" />

      {job.achievements && job.achievements.length > 0 && (
        <>
          <p className="achievements-label"><strong>Key Achievements:</strong></p>
          <BulletList items={job.achievements} className="work-achievements-list" />
        </>
      )}

      {job.techStack && (
        <p className="tech-stack">
          <strong>Tech Stack:</strong> {job.techStack}
        </p>
      )}

      {showGap && <div className="job-gap"></div>}
    </article>
  );
}
