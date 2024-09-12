import { addProduct } from "@/utils/actions";
import React from "react";

const AddProduct = () => {
  return (
    <div className="bg-gray-800 p-5 mt-5 rounded">
      <form action={addProduct} className="flex flex-wrap justify-between">
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <select
          name="category"
          id="category"
          className=" p-7 bg-transparent border rounded w-[45%] mb-7"
        >
          <option value="general">Select a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="text"
          placeholder="Color"
          name="color"
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <input
          type="text"
          placeholder="Size"
          name="size"
          className="p-7 w-[45%] bg-transparent border rounded mb-7"
        />
        <textarea
          name="description"
          id="desc"
          placeholder="Description"
          rows={16}
          className="p-7 bg-transparent border rounded w-full mb-7"
        ></textarea>
        <button type="submit" className="w-full bg-teal-800 p-7 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
