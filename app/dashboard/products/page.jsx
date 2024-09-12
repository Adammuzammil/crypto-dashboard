import { deletProduct } from "@/utils/actions";
import { fetchProducts } from "@/utils/data";
import Pagination from "@/app/ui/dashboard/Pagination";
import Search from "@/app/ui/dashboard/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = async ({ searchParams }) => {
  // console.log(id)
  const q = searchParams?.q || "";
  const page = searchParams?.page || "";
  const { count, products } = await fetchProducts(q, page);
  return (
    <div className="bg-gray-800 p-5 rounded mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for products" />
        <Link href="/dashboard/products/add">
          <button className="bg-purple-600 px-4 py-2 rounded-lg text-sm">
            Add New
          </button>
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <td className="p-2">Title</td>
            <td className="p-2">Description</td>
            <td className="p-2">Price</td>
            <td className="p-2">Created At</td>
            <td className="p-2">Stock</td>
            <td className="p-2">Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={i}>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/noproduct.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  {item?.title}
                </div>
              </td>
              <td className="p-2">{item?.description}</td>
              <td className="p-2">${item?.price}</td>
              <td className="p-2">13.01.2021</td>
              <td className="p-2">{item?.stock}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${item.id}`}>
                    <button className="py-1 px-2 rounded border-none cursor-pointer bg-teal-700">
                      View
                    </button>
                  </Link>
                  <form action={deletProduct}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="py-1 px-2 rounded border-none cursor-pointer bg-red-700">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination count={count} />
    </div>
  );
};

export default Products;
