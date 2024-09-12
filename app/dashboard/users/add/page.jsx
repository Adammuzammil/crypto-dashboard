import { addUser } from "@/utils/actions";
import React from "react";

const AddUser = () => {
  return (
    <div className="bg-gray-800 p-5 mt-5 rounded">
      <form action={addUser} className="flex flex-wrap justify-between">
        <input
          type="text"
          placeholder="firstname"
          name="firstname"
          required
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          required
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          required
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <select
          name="isActive"
          id="isActive"
          className=" p-7 bg-transparent border rounded w-[45%] mb-7"
        >
          <option value={false}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type="submit" className="w-full bg-teal-800 p-7 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
