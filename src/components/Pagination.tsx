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
    if (totalPages <= 10) {
      return [...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 mx-1 rounded-lg font-semibold ${
              page === currentPage
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {page}
          </button>
        );
      });
    } else {
      let pages: (number | string)[] = [];

      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages - 1, totalPages];
      } else if (currentPage >= totalPages - 3) {
        pages = [
          1,
          2,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }

      return pages.map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-3 py-2 mx-1 text-white">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 mx-1 rounded-lg font-semibold ${
              page === currentPage
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {page}
          </button>
        )
      );
    }
  };

  return (
    <div className="flex justify-center items-center my-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 text-white font-semibold disabled:opacity-50"
      >
        Prev
      </button>

      {renderPages()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 text-white font-semibold disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
