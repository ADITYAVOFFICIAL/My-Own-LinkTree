import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aditya Verma | Software Developer & Data Scientist",
  description: "Explore the professional profile of Aditya Verma, a Data Science and Business Systems student at SRMIST. Connect with me on various platforms like LinkedIn, GitHub, and more. Discover my projects, skills, and contributions to technology.",
  keywords: "Aditya Verma, Data Scientist, Developer, Data Science, Business Systems, SRMIST, Machine Learning, Computer Vision, Web Development, Portfolio",
  authors: [{ name: "Aditya Verma" }], // Correct structure for authors
  robots: "index, follow", // Allow search engines to index the page and follow links
  openGraph: {
    title: "Aditya Verma | Software Developer & Data Scientist",
    description: "Explore my projects, skills, and connect with me on various platforms.",
    url: "https://adityaver.vercel.app/", // Your website URL
    siteName: "Aditya Verma Linktree",
    type: "website",
    images: [
      {
        url: "https://srmsigkdd-cdn.netlify.app/images/team_aditya (1).jpg", // Replace with an image URL for better social sharing
        width: 800,
        height: 600,
        alt: "Aditya Verma - Software Developer & Data Scientist",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
