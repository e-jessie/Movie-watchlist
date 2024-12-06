"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/signup"); // Redirect to login if not authenticated
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, [router]);

  if (isLoading) return <p>Loading...</p>; // Show loading state while checking auth

  return <>{children}</>;
}
