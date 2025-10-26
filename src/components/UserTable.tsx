"use client";

import Link from "next/link";
import { useState } from "react";
import type { User } from "@/types/user";

interface Props {
  users: User[];
  onDelete: (id: string) => Promise<void>;
}

export default function UserTable({ users, onDelete }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-gray-500" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">{u.role}</span>
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/users/${u.id}/edit`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      disabled={deleting === u.id}
                      onClick={async () => {
                        if (!confirm(`Delete ${u.name}?`)) return;
                        setDeleting(u.id);
                        try {
                          await onDelete(u.id);
                        } finally {
                          setDeleting(null);
                        }
                      }}
                    >
                      {deleting === u.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
