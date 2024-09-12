import Image from "next/image";
import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="">
      <div className="item">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <Image
            src="/astronaut.png"
            fill
            className="object-contain opacity-20"
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="font-medium text-xs">Takes 4 minutes to learn</span>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="p-2 px-3 flex items-center gap-2 bg-[#5d57c9] text-white rounded cursor-pointer w-max">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>

      <div className="item">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <Image
            src="/astronaut.png"
            fill
            className="object-contain opacity-20"
          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="font-medium text-xs">Takes 4 minutes to learn</span>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="p-2 px-3 flex items-center gap-2 bg-[#5d57c9] text-white rounded cursor-pointer w-max">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
