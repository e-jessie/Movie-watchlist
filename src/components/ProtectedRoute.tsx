"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token')


    if (!token) {
      console.log("No token found, redirecting...");
      router.push("/auth/signup");
      return;
    }

    setIsLoading(false)

  }, [router]);

  if (isLoading) return <p>Loading...</p>; // Show loading state while checking auth

  return <>{children}</>;
}
