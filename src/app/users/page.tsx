// src/app/users/page.tsx (Server Component)
import { Suspense } from "react";
import UsersPageClient from "./UsersPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Indigo + gray professional loader
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium text-gray-600">Loading userssss...</p>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <UsersPageClient />
    </Suspense>
  );
}
