import type { ResumeData } from '../../types/resume';
import Header from '../../components/Header';
import Section from '../../components/Section';
import SkillsFilter from '../../components/SkillsFilter';
import WorkExperience from '../../components/WorkExperience';
import Education from '../../components/Education';
import Certifications from '../../components/Certifications';
import Projects from '../../components/Projects';
import AdditionalInfo from '../../components/AdditionalInfo';

export interface TemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="resume-container">
      <Header personalInfo={data.personalInfo} />
      <Section title="PROFESSIONAL SUMMARY">
        <p className="summary">{data.profileSummary}</p>
      </Section>
      <Section title="SKILLS">
        <SkillsFilter skills={data.skills} />
      </Section>
      <Section title="WORK EXPERIENCE">
        <WorkExperience jobs={data.workExperience} />
      </Section>
      <Section title="EDUCATION">
        <Education education={data.education} />
      </Section>
      {data.certifications && data.certifications.length > 0 && (
        <Section title="CERTIFICATIONS">
          <Certifications certifications={data.certifications} />
        </Section>
      )}
      {data.projects && data.projects.length > 0 && (
        <Section title="PROJECTS">
          <Projects projects={data.projects} />
        </Section>
      )}
      {data.additionalInfo?.languages && data.additionalInfo.languages.length > 0 && (
        <Section title="ADDITIONAL INFORMATION">
          <AdditionalInfo languages={data.additionalInfo.languages} />
        </Section>
      )}
    </div>
  );
}
