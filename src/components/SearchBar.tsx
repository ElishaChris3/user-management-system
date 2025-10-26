"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ROLES = ["ADMIN", "EDITOR", "VIEWER"] as const;

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [role, setRole] = useState(sp.get("role") ?? "");

  
  const debouncedQ = useDebounce(q, 400);
  const debouncedRole = useDebounce(role, 200);

  
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    if (debouncedQ) params.set("q", debouncedQ);
    else params.delete("q");

    if (debouncedRole) params.set("role", debouncedRole);
    else params.delete("role");

    
    params.delete("page");

    router.push(`/users?${params.toString()}`);
    
  }, [debouncedQ, debouncedRole]);

  return (
    <div className="card mb-5 border border-gray-200 bg-white p-5 shadow-sm">
      <form
        onSubmit={(e) => e.preventDefault()}
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
            onClick={() => {
              setQ("");
              setRole("");
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
