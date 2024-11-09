"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    // If no user is stored, redirect to the root "/"
    if (!storedUser) {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
