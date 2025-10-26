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
    if (next.q !== undefined) next.q ? params.set("q", next.q) : params.delete("q");
    if (next.role !== undefined)
      next.role ? params.set("role", next.role) : params.delete("role");
    router.push(`/users?${params.toString()}`);
  }

  return (
    <div className="card mb-5 border border-gray-200 bg-white p-5 shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateQuery({ q, role });
        }}
        className="flex flex-col gap-4 md:flex-row md:items-end"
      >
        <div className="flex-1">
          <label className="label mb-1 text-gray-700">Search by name</label>
          <input
            className="input focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Ada, Alan..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="w-full md:w-56">
          <label className="label mb-1 text-gray-700">Role</label>
          <select
            className="input focus:ring-2 focus:ring-indigo-500"
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
          <button
            type="button"
            className="btn btn-secondary hover:border-indigo-500 hover:text-indigo-600"
            onClick={() => updateQuery({ q: "", role: "" })}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
