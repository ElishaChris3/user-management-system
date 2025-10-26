"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Role, User } from "@/types/user";

interface Props {
  initial?: Partial<User>;
  mode: "create" | "edit";
  userId?: string;
}

const ROLES: Role[] = ["ADMIN", "EDITOR", "VIEWER"];

export default function UserForm({ initial, mode, userId }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<Role>((initial?.role as Role) ?? "VIEWER");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { name, email, role };
      const res = await fetch(
        mode === "create" ? "/api/users" : `/api/users/${userId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to save");
      }
      router.push("/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card border border-gray-200 shadow-sm bg-white p-6 space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label mb-1">Name</label>
          <input
            className="input focus:ring-2 focus:ring-indigo-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
          />
        </div>

        <div>
          <label className="label mb-1">Email</label>
          <input
            className="input focus:ring-2 focus:ring-indigo-500"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@example.com"
          />
        </div>

        <div>
          <label className="label mb-1">Role</label>
          <select
            className="input focus:ring-2 focus:ring-indigo-500"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-700"
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : mode === "create"
            ? "Create user"
            : "Save changes"}
        </button>
        <button
          className="btn btn-secondary hover:border-indigo-500 hover:text-indigo-600"
          type="button"
          onClick={() => router.push("/users")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
