"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Check, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const passwordStrength = Math.min(Math.floor(password.length / 3), 3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/login");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-300 rounded-lg flex items-center justify-center">
              <Logo className="text-white dark:text-gray-900" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to Kaizen
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            Your personal crypto portfolio tracker
          </p>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-gray-900/50 text-red-700 dark:text-gray-400 rounded-lg border border-red-200 dark:border-gray-700">
              <ShieldAlert size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-600 h-11 text-gray-900 dark:text-gray-200"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-600 h-11 text-gray-900 dark:text-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-gray-900 dark:bg-white rounded-lg font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-700 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
