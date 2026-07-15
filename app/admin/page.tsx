import { redirect } from "next/navigation";
import { AdminConfigurationNotice } from "@/components/admin/AdminConfigurationNotice";
import { getAdminAccess } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminIndexPage() {
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

  redirect("/admin/vendor-leads");
}
