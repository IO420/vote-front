"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface GuardProps {
  children: ReactNode;
}

export default function Guard({ children }: GuardProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  return <>{children}</>;
}
