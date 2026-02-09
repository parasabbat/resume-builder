import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Doe - Software Architect",
  description: "Professional resume of John Doe, Software Architect with 10+ years of experience in cloud-native solutions, microservices, and DevOps.",
  keywords: ["resume", "software architect", "React", "Next.js", "TypeScript", "cloud computing"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "John Doe - Software Architect",
    description: "Professional resume showcasing experience and skills",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        {children}
      </body>
    </html>
  );
}
