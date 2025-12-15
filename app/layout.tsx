import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next AI PlantUML",
  description: "A Next.js-based UML Diagram Generator with AI capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
