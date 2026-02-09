import CopyToClipboard from "./CopyToClipboard";

interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin?: string;
  github?: string;
}

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export default function Header({ personalInfo }: HeaderProps) {
  const { name, title, phone, email, location, linkedin, github } = personalInfo;
  
  return (
    <header className="header">
      <h1 className="name">{name}</h1>
      <p className="designation">{title}</p>
      <div className="contact-info">
        <p>
          Phone: {phone}
          <CopyToClipboard text={phone} label="Phone" />
        </p>
        <p>
          Email: {email}
          <CopyToClipboard text={email} label="Email" />
        </p>
        <p>Location: {location}</p>
        {linkedin && <p>LinkedIn: {linkedin}</p>}
        {github && <p>GitHub: {github}</p>}
      </div>
    </header>
  );
}