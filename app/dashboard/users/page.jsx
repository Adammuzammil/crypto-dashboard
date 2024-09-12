import { deletUser } from "@/utils/actions";
import { fetchUsers } from "@/utils/data";
import { getSession } from "@/utils/getSession";
import Pagination from "@/app/ui/dashboard/Pagination";
import Search from "@/app/ui/dashboard/Search";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Users = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "";
  const { count, users } = await fetchUsers(q, page);

  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-800 p-5 rounded mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for users" />
        {user?.role === "admin" && (
          <Link href="/dashboard/users/add">
            <button className="bg-purple-600 px-4 py-2 rounded-lg text-sm">
              Add New
            </button>
          </Link>
        )}
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <td className="p-2">Name</td>
            <td className="p-2">Email</td>
            <td className="p-2">CreatedAt</td>
            <td className="p-2">Role</td>
            <td className="p-2">Status</td>
            <td className="p-2">Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((users, i) => (
            <tr key={i}>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={users?.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  {users?.userName}
                </div>
              </td>
              <td className="p-2">{users?.email}</td>
              <td className="p-2">13.01.2021</td>
              <td className="p-2">Supervisor</td>
              <td className="p-2">Active</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <Link href={`/dashboard/users/${users.id}`}>
                    <button className="py-1 px-2 rounded border-none cursor-pointer bg-teal-700">
                      View
                    </button>
                  </Link>
                  <form action={deletUser}>
                    <input type="hidden" name="id" value={users.id} />
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

export default Users;
