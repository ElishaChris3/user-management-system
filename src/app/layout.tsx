import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "User Management System",
  description: "Next.js + Prisma (MongoDB) CRUD",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        {/* Main content grows to fill remaining space */}
        <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
