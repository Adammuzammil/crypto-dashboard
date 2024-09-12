import React from "react";

const SingleProduct = () => {
  return (
    <div className="flex gap-12 mt-5">
      <div className="flex-1 bg-gray-800 p-5 rounded-lg h-max ">
        <div className="w-full h-[300px] relative overflow-hidden mb-5">
          <img src="/noavatar.png" alt="avatar" className="rounded-full" />
        </div>
        John Doe
      </div>

      <div className="flex-[3_3_0%]">
        <form className="flex flex-col">
          <label className="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            className="p-5 border rounded my-2 w-full"
          />
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Johndoe@example.com"
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
              placeholder="+11 1234567894"
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>
            Address
            <textarea
              name="address"
              placeholder="Johnston with the T"
              className="p-5 border rounded my-2 w-full"
            />
          </label>
          <label>Is Admin?</label>
          <select
            name="category"
            id="category"
            className="p-5 border rounded my-2 w-full text-black"
          >
            <option value={false}>Is Admin?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select
            name="category"
            id="category"
            className="p-5 border rounded my-2 w-full text-black"
          >
            <option value={false}>Is Active?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
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

export default SingleProduct;
