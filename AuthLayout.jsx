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
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return children;
}
