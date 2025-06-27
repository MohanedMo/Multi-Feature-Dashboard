import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./pagination.css";

interface PaginationProps {
  totalPages: number;
  totalPosts: number;
  start: number;
  end: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, totalPosts, start, end }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const goToPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate({ search: newSearchParams.toString() });
  };
    const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    return pages
  }


  return (
    <div className="pagination-container">
      {totalPosts !== 0 && (
      <div className="pagination-stats">
        Showing {start} to {end} of {totalPosts} posts
      </div>
      )}
      <div className="pagination-controls">
        <div className="pagination-group">
          <button
            onClick={() => goToPage( currentPage - 1)}
            disabled={currentPage === 1}
            className="button button-outline button-sm controls"
          >
            Previous
          </button>

          <div className="page-numbers">
            {getPageNumbers().slice(0, 3).map((pageNum) => (
              <button
                key={pageNum}
                className={`button button-sm button-icon ${
                  currentPage === pageNum ? "button-primary" : "button-outline"
                }`}
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {totalPages > 3 && currentPage < totalPages - 1 && (
              <span
                style={{
                  padding: "0 0.5rem",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                ...
              </span>
            )}
            {totalPages > 3 && currentPage < totalPages && (
              <button
                className="button button-outline button-sm button-icon"
                onClick={() => goToPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            className="button button-outline button-sm controls"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="button-text">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
