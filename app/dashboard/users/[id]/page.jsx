import { updateUser } from "@/utils/actions";
import { fetchUser } from "@/utils/data";
import React from "react";

const SingleUser = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  return (
    <div className="flex gap-12 mt-5">
      <div className="flex-1 bg-gray-800 p-5 rounded-lg h-max ">
        <div className="w-full h-[300px] relative overflow-hidden mb-5">
          <img
            src={user?.img || "/noavatar.png"}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        {user?.userName}
      </div>

      <div className="flex-[3_3_0%]">
        <form action={updateUser} className="flex flex-col">
          <input type="hidden" name="id" value={user.id} />
          <label className="">Username</label>
          <input
            type="text"
            name="userName"
            placeholder={user?.userName}
            className="p-5 border rounded my-2 w-full"
          />
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder={user?.email}
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>
            Phone
            <input
              type="phone"
              name="phone"
              placeholder={user?.phone}
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>
            Address
            <textarea
              name="address"
              placeholder={user?.address}
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            className="p-5 border rounded my-2 w-full text-black"
          >
            <option value={false}>Is Admin?</option>
            <option value={true} selected={user.isAdmin}>
              Yes
            </option>
            <option value={false} selected={!user.isAdmin}>
              No
            </option>
          </select>
          <label>Is Active?</label>
          <select
            name="isActive"
            id="isActive"
            className="p-5 border rounded my-2 w-full text-black"
          >
            <option value={false}>Is Active?</option>
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>

          <button
            type="submit"
            className="w-full p-5 bg-teal-800 border-none rounded cursor-pointer mt-5"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleUser;
