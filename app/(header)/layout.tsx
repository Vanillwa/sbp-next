import { Suspense } from "react";
import Navi from "../component/navi/navi";
import { AuthProvider } from "../context/authContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Navi />
      </AuthProvider>
      {children}
    </>
  );
}
