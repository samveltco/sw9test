import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const showDots = totalPages > 5;
    
    if (!showDots) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              className={currentPage === i ? 'current_page' : ''}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <li key={1}>
          <button
            onClick={() => onPageChange(1)}
            className={currentPage === 1 ? 'current_page' : ''}
          >
            1
          </button>
        </li>
      );

      // Show current page if it's not 1 or last
      if (currentPage > 2 && currentPage < totalPages - 1) {
        if (currentPage > 3) {
          pages.push(<li key="dots1"><span>...</span></li>);
        }
        
        pages.push(
          <li key={currentPage}>
            <button
              onClick={() => onPageChange(currentPage)}
              className="current_page"
            >
              {currentPage}
            </button>
          </li>
        );
      }

      // Show ellipsis and last page
      if (showEllipsis && totalPages > 3) {
        if (currentPage < totalPages - 2) {
          pages.push(<li key="dots2"><span>...</span></li>);
        }
        
        pages.push(
          <li key={totalPages}>
            <button
              onClick={() => onPageChange(totalPages)}
              className={currentPage === totalPages ? 'current_page' : ''}
            >
              {totalPages}
            </button>
          </li>
        );
      }
    }
    
    return pages;
  };

  return (
    <div className="paging">
      <ul>
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`prev_page icon_prev ${currentPage === 1 ? 'inactive' : ''}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        
        {renderPageNumbers()}
        
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`next_page icon_next ${currentPage === totalPages ? 'inactive' : ''}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination; 