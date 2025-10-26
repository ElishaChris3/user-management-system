"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/users"
          className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
        >
          <span className="text-indigo-600">User</span> Management
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/users" className="hover:text-indigo-600 transition-colors">
            Users
          </Link>
          <Link href="/users/new" className="hover:text-indigo-600 transition-colors">
            Add User
          </Link>
          <a
            href="https://www.prisma.io/docs/orm/overview/databases/mongodb"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            Prisma + MongoDB
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-6 py-3 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <Link
            href="/users"
            className="hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link
            href="/users/new"
            className="hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Add User
          </Link>
          <a
            href="https://www.prisma.io/docs/orm/overview/databases/mongodb"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-600"
          >
            Prisma + MongoDB
          </a>
        </nav>
      )}
    </header>
  );
}
