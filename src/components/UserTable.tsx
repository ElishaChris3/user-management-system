"use client";

import Link from "next/link";
import { useState } from "react";
import type { User } from "@/types/user";
import { toast } from "react-toastify";

interface Props {
  users: User[];
  onDelete: (id: string) => Promise<void>;
}

export default function UserTable({ users, onDelete }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    setDeleting(id);
    try {
      await onDelete(id);
      toast.success(`🗑️ Deleted ${name} successfully`);
    } catch {
      toast.error("❌ Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };
  return (
    <div className="card shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 text-left font-semibold uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-right font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-indigo-100 text-indigo-700"
                          : u.role === "EDITOR"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/users/${u.id}/edit`}
                        className="btn btn-secondary hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger hover:bg-red-700 transition-colors"
                        disabled={deleting === u.id}
                        onClick={() => handleDelete(u.id, u.name)}
                      >
                        {deleting === u.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
