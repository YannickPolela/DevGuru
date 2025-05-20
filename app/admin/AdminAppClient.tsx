// app/admin/AdminAppClient.tsx
"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminAppClient = () => {
  return <App />;
};

export default AdminAppClient;
