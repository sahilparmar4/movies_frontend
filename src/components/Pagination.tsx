import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const left = Math.max(2, currentPage - delta);
      const right = Math.min(totalPages - 1, currentPage + delta);

      pages.push(1);

      if (left > 2) pages.push("...");

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages.map((page, i) =>
      page === "..." ? (
        <span key={i} className="px-3 py-2 mx-1 text-white cursor-pointer">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`px-4 py-2 mx-1 rounded-lg font-semibold cursor-pointer ${page === currentPage
              ? "bg-green-500 text-white"
              : "bg-gray-800 text-white"
            }`}
        >
          {page}
        </button>
      )
    );
  };


  return (
    <div className="flex justify-center items-center my-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-2 text-white font-semibold disabled:opacity-50 ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        Prev
      </button>

      {renderPages()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-2 text-white font-semibold disabled:opacity-50 ${currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
