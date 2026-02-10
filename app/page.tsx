import { Metadata } from "next";
import resumeData from "@/data/data.json";
import Header from "./components/Header";
import Section from "./components/Section";
import SkillsFilter from "./components/SkillsFilter";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import AdditionalInfo from "./components/AdditionalInfo";
import PrintButton from "./components/PrintButton";
import DocumentTitle from "./components/DocumentTitle";
import ScrollToTop from "./components/ScrollToTop";
import ViewCounter from "./components/ViewCounter";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

export const metadata: Metadata = {
  title: `${resumeData.personalInfo.name} - ${resumeData.personalInfo.title}`,
  description: resumeData.profileSummary,
};

export default function ResumePage() {
  return (
    <>
      <DocumentTitle 
        name={resumeData.personalInfo.name} 
        title={resumeData.personalInfo.title} 
      />
      <ViewCounter />
      <ScrollToTop />
      <PrintButton />
      
      <div className="resume-container">
        <Header personalInfo={resumeData.personalInfo} />

        <Section title="PROFESSIONAL SUMMARY">
          <p className="summary">{resumeData.profileSummary}</p>
        </Section>

        <Section title="SKILLS">
          <SkillsFilter skills={resumeData.skills} />
        </Section>

        <Section title="WORK EXPERIENCE">
          <WorkExperience jobs={resumeData.workExperience} />
        </Section>

        <Section title="EDUCATION">
          <Education education={resumeData.education} />
        </Section>

        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <Section title="CERTIFICATIONS">
            <Certifications certifications={resumeData.certifications} />
          </Section>
        )}

        {resumeData.projects && resumeData.projects.length > 0 && (
          <Section title="PROJECTS">
            <Projects projects={resumeData.projects} />
          </Section>
        )}

        <Section title="ADDITIONAL INFORMATION">
          <AdditionalInfo languages={resumeData.additionalInfo.languages} />
        </Section>
      </div>
      
      <KeyboardShortcuts />
    </>
  );
}