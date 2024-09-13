"use client";

import { register } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { getSession } from "../../utils/getSession";
import { redirect } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";

const Register = () => {
  // const session = await getSession();
  // const user = session?.user;
  // if (user) {
  //   redirect("/dashboard");
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  };

  return (
    <div className="mt-28 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Welcome to DashRadar
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-30 text-center">
        Please provide all the necessary information
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="***********"
              type="password"
              name="password"
              className="mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Sign up &rarr;
        </button>

        <p className="text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Already have an account?{" "}
          <Link href="/login" className="hover:underline underline-offset-4">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
