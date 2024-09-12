"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const page = searchParams.get("page") || 1;

  const ITEMS_PER_PAGE = 2;

  const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext =
    ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;

  const handlePageChange = (direction) => {
    direction === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="p-2 flex justify-between">
      <button
        className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed bg-white text-black text-sm disabled:bg-gray-700"
        disabled={!hasPrev}
        onClick={() => handlePageChange("prev")}
      >
        Previous
      </button>
      <button
        className="py-1 px-2 cursor-pointer disabled:cursor-not-allowed bg-white text-black text-sm"
        disabled={!hasNext}
        onClick={() => handlePageChange("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
