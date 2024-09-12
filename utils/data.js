import { User } from "@/models/User";
import { connectToDB } from "./db";
import { Product } from "@/models/Product";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  // Number of users you want per page
  const ITEMS_PER_PAGE = 2;
  const safePage = Math.max(1, parseInt(page) || 1);

  // Calculate the number of items to skip based on the current page
  const skip = (safePage - 1) * ITEMS_PER_PAGE;

  try {
    connectToDB();
    const count = await User.countDocuments({ userName: { $regex: regex } });
    const users = await User.find().limit(ITEMS_PER_PAGE).skip(skip);
    return { users, count };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};

export const fetchProducts = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 1;

  const safePage = Math.max(1, parseInt(page) || 1);

  // Calculate the number of items to skip based on the current page
  const skip = (safePage - 1) * ITEM_PER_PAGE;

  try {
    connectToDB();
    const count = await Product.countDocuments({ title: { $regex: regex } });
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(skip);
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product!");
  }
};
