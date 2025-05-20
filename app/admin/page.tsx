// app/admin/page.tsx
import { redirect } from "next/navigation";
import AdminAppClient from "./AdminAppClient";
import { isAdmin } from "@/lib/admin";


const AdminPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return <AdminAppClient />;
};

export default AdminPage;
