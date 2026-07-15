import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminConfigurationNotice } from "@/components/admin/AdminConfigurationNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminAccess } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const access = await getAdminAccess();

  if (access.kind === "missing-configuration") {
    return <AdminConfigurationNotice />;
  }

  if (access.kind === "anonymous") {
    redirect("/admin/login?next=/admin/vendor-leads");
  }

  if (access.kind === "forbidden") {
    redirect("/admin/access-denied");
  }

  return <AdminShell email={access.email}>{children}</AdminShell>;
}
