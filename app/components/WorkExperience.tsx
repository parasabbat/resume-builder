import WorkItem, { Job } from "./WorkItem";

interface WorkExperienceProps {
  jobs: Job[];
}

export default function WorkExperience({ jobs }: WorkExperienceProps) {
  return (
    <div className="work-experience">
      {jobs.map((job, index) => (
        <WorkItem
          key={`${job.company}-${job.period}`}
          job={job}
          showGap={index < jobs.length - 1}
        />
      ))}
    </div>
  );
}

