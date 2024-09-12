"use server";

import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { connectToDB } from "@/utils/db";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Please fill all fields");
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbaclUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = CredentialsSignin;
    return someError.cause;
  }

  redirect("/dashboard");
};

export const register = async (formData) => {
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  await connectToDB();

  // existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 1);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  console.log("Created Successfully!!");
  redirect("/login");
};
