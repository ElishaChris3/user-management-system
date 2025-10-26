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
      const payload: any = { name, email, role };
      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // For edit, email might be disabled to edit; still send if present
        res = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
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
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <label className="label">Name</label>
          <input
            className="input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
          />
        </div>

        <div className="col-span-1">
          <label className="label">Email</label>
          <input
            className="input"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@example.com"
          />
        </div>

        <div className="col-span-1">
          <label className="label">Role</label>
          <select
            className="input"
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

      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : mode === "create" ? "Create user" : "Save changes"}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => router.push("/users")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
