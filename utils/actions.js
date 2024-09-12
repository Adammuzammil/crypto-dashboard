"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { genSalt } from "bcrypt";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import { Product } from "@/models/Product";
import { connectToDB } from "./db";

export const addUser = async (formData) => {
  const { firstName, lastName, email, password, isActive } =
    Object.fromEntries(formData);

  const salt = await genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add user");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, userName, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      userName,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, description, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add product");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deletProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete product");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deletUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};
