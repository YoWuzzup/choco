"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

type TPagination = {
  totalPages: number;
  itemsLength: number;
  itemsPerPage: number;
  onPageChange: (name: string, value: string) => void;
};

export const Pagination: React.FC<TPagination> = ({
  totalPages,
  itemsLength,
  itemsPerPage,
  onPageChange,
}) => {
  const searchParams = useSearchParams();
  const pageQueryParam = searchParams.get("page");
  const currentPageNumber = Number(pageQueryParam);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    onPageChange(name, value);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtonsToShow = 3;
    const startPage = Math.max(currentPageNumber - 1, 1);
    const endPage = Math.min(startPage + maxPageButtonsToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            name="page"
            value={i}
            onClick={handleChange}
            className={`flex items-center justify-center p-4 h-full ms-0 leading-tight
              rounded-full duration-300 shadow-md hover:bg-colorful hover:text-secondary
              ${currentPageNumber === i
                ? "bg-colorful text-secondary"
                : "text-primary bg-primary"
              }`}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav
      aria-label="Page navigation"
      className="w-full flex flex-row flex-nowrap justify-center"
    >
      <ul className="inline-flex gap-3 -space-x-px text-base h-10">
        {/* Previous page button */}
        {currentPageNumber > 1 && (
          <li>
            <button
              name="page"
              value={currentPageNumber - 1}
              onClick={handleChange}
              disabled={currentPageNumber === 1}
              className="flex items-center justify-center p-4 h-full ms-0 leading-tight
              text-primary bg-primary rounded-full duration-300 shadow-md
              hover:bg-colorful hover:text-secondary"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
        )}

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next page button */}
        {itemsLength >= itemsPerPage && (
          <li>
            <button
              name="page"
              value={currentPageNumber + 1}
              onClick={handleChange}
              disabled={currentPageNumber === totalPages}
              className="flex items-center justify-center p-4 h-full ms-0 leading-tight
              text-primary bg-primary rounded-full duration-300 shadow-md
              hover:bg-colorful hover:text-secondary"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
