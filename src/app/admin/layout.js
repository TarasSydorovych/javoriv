// src/app/admin/layout.js
import ProtectedRoute from "@/app/components/protectedRoute";

export default function AdminLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
