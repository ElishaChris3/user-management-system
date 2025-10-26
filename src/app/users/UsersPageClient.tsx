"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import SearchBar from "@/components/SearchBar";
import type { User } from "@/types/user";
import { useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function UsersPageClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const page = parseInt(sp.get("page") || "1", 10);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const q = sp.get("q");
      const role = sp.get("role");
      if (q) params.set("q", q);
      if (role) params.set("role", role);
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const res = await fetch(`/api/users?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.data);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || "Error loading users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.get("q"), sp.get("role"), page]);

  function goToPage(p: number) {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    router.push(`/users?${params.toString()}`);
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Failed to delete");
      return;
    }
    fetchUsers();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <Link href="/users/new" className="btn btn-primary bg-indigo-600 hover:bg-indigo-700">
          + Add user
        </Link>
      </div>

      <SearchBar />

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && <UserTable users={users} onDelete={handleDelete} />}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded text-sm border ${
                  p === page
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
            className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
