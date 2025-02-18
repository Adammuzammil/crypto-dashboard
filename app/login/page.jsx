"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getAccessToken } from "@/utils/getAccessToken";
import Logo from "@/components/shared/Logo";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  ScanEye,
  ShieldAlert,
  Terminal,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firebase: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 0;
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email" && !validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else if (field === "password" && !validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErrors({ email: "", password: "", firebase: "" });
    let formValid = true;
    const newErrors = { email: "", password: "", firebase: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      formValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password is required";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      localStorage.setItem("userInfo", JSON.stringify(user));

      // Get the access token
      const accessToken = await user.getIdToken();

      // Store the token in a cookie that expires in 7 days
      Cookies.set("accessToken", accessToken, { expires: 7 });
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
      }

      setErrors((prev) => ({ ...prev, firebase: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-300 rounded-lg flex items-center justify-center">
              <Logo className="text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to your Kaizen account
          </p>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit}>
          {errors.firebase && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-700/50 text-red-700 dark:text-gray-400 rounded-lg border border-red-200 dark:border-gray-700">
              <ShieldAlert size={18} color="red" />
              <span className="text-sm">{errors.firebase}</span>
            </div>
          )}

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(e.target.value) ? "" : prev.email,
                  }));
                }
              }}
              onBlur={handleBlur("email")}
              placeholder="Enter your email"
              className="mt-2 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-600 h-11 text-gray-900 dark:text-gray-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: validatePassword(e.target.value)
                        ? ""
                        : prev.password,
                    }));
                  }
                }}
                onBlur={handleBlur("password")}
                placeholder="••••••••"
                className="mt-2 bg-white dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-600 h-11 text-gray-900 dark:text-gray-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gray-900 dark:bg-white rounded-lg font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-700 dark:text-gray-400">
            New to Kaizen?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
