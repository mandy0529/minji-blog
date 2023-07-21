import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, QueryProvider, ModeToggle } from "../components";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "❤️‍🔥 Minji Blog ❤️‍🔥",
  description: "A Minji Blog with next.js and nest.js with typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <Navbar />
            <div className="container max-w-7xl mx-auto h-full pt-12">
              {children}
            </div>
            <ModeToggle />
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
