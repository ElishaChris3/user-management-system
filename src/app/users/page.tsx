// src/app/users/page.tsx (Server Component)
import { Suspense } from "react";
import UsersPageClient from "./UsersPageClient";
import Loader from "@/components/Loader";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default function UsersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <UsersPageClient />
    </Suspense>
  );
}
