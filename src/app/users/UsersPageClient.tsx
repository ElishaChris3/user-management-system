// src/app/users/UsersPageClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import SearchBar from "@/components/SearchBar";
import type { User } from "@/types/user";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function UsersPageClient() {
  const sp = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const q = sp.get("q");
      const role = sp.get("role");
      if (q) params.set("q", q);
      if (role) params.set("role", role);
      const res = await fetch(`/api/users?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.data);
    } catch (err: any) {
      setError(err.message || "Error loading users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.get("q"), sp.get("role")]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <Link href="/users/new" className="btn btn-primary">
          + Add user
        </Link>
      </div>

      <SearchBar />

      {loading && <Loader />}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && <UserTable users={users} onDelete={async (id: string) => {
        const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(data?.error || "Failed to delete");
          return;
        }
        await fetchUsers();
      }} />}
    </div>
  );
}
