import Link from "next/link";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "User Management System",
  description: "Next.js + Prisma (MongoDB) CRUD",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/users" className="font-semibold tracking-tight">
              User Management
            </Link>
            <nav className="text-sm space-x-4">
              <Link href="/users" className="hover:underline">
                Users
              </Link>
              <a
                href="https://www.prisma.io/docs/orm/overview/databases/mongodb"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Prisma + MongoDB
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
