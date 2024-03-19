import type { Metadata } from "next";
import { Navbar } from "@/components";
import "./globals.css";
import "./resets.css";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <Navbar />
        <div className="app">{children}</div>
      </body>
    </html>
  );
}
