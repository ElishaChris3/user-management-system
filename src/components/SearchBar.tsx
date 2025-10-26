"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ROLES = ["ADMIN", "EDITOR", "VIEWER"] as const;

export default function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [role, setRole] = useState(sp.get("role") ?? "");

  useEffect(() => {
    setQ(sp.get("q") ?? "");
    setRole(sp.get("role") ?? "");
  }, [sp]);

  function updateQuery(next: { q?: string; role?: string }) {
    const params = new URLSearchParams(sp.toString());
    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.role !== undefined) {
      if (next.role) params.set("role", next.role);
      else params.delete("role");
    }
    router.push(`/users?${params.toString()}`);
  }

  return (
    <div className="card mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateQuery({ q, role });
        }}
        className="flex flex-col gap-3 md:flex-row md:items-end"
      >
        <div className="flex-1">
          <label className="label">Search by name</label>
          <input
            className="input"
            placeholder="e.g. Ada, Alan..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="w-full md:w-56">
          <label className="label">Role</label>
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-secondary" type="button" onClick={() => updateQuery({ q: "", role: "" })}>
            Reset
          </button>
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
