import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PrivacyBanner from "./components/PrivacyBanner";
import { ResumeProvider } from "./context/ResumeContext";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build, manage, and share professional resumes - 100% local, no server needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <PrivacyBanner />
        <Navigation />
        <ResumeProvider>
          <main style={{ minHeight: 'calc(100vh - 120px)' }}>
            {children}
          </main>
        </ResumeProvider>
        <footer
          className="no-print"
          style={{
            textAlign: 'center',
            padding: '20px',
            borderTop: '1px solid #e5e8ee',
            fontSize: '13px',
            color: '#6b7280',
            background: '#fafbfc',
          }}
        >
          {'\u{1F512}'} 100% Local {'\u2014'} No server, no database, no tracking. Your data stays in your browser.
        </footer>
      </body>
    </html>
  );
}