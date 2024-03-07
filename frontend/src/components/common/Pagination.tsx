type TPagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<TPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav
      aria-label="Page navigation"
      className="w-full flex flex-row flex-nowrap justify-center"
    >
      {/* Previous page button */}
      <ul className="inline-flex gap-3 -space-x-px text-base h-10">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
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

        {/* TODO:show only 5 pages and "..." on both sides */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className="flex items-center justify-center p-4 h-full ms-0 leading-tight
              text-primary bg-primary rounded-full duration-300 shadow-md
              hover:bg-colorful hover:text-secondary "
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next page button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
      </ul>
    </nav>
  );
};
