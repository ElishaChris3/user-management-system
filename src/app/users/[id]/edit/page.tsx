"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";
import type { User } from "@/types/user";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.error || "Failed to load user");
        }
        const data = await res.json();
        setUser(data.data);
      } catch (e: any) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!user) return <p className="text-sm text-gray-500">User not found.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit user</h1>
      <UserForm mode="edit" userId={user.id} initial={user} />
    </div>
  );
}
