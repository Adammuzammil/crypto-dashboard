"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/utils/getAccessToken";
import { getUserInfo } from "./utils/jwtDecode";

const publicRoutes = ["/login", "/register"]; // Add any public routes here

export default function AuthLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (!token && !publicRoutes.includes(pathname)) {
        router.replace("/login");
      } else if (token && publicRoutes.includes(pathname)) {
        router.replace("/dashboard");
      } else {
        if (token) {
          const userInfo = getUserInfo();
          setUser(userInfo);
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        {/* Loading Text */}
        <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-300 animate-pulse">
          Kaizen
        </p>
      </div>
    ); // Or a more sophisticated loading indicator
  }

  return children;
}
