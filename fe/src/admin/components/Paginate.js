import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Paginate = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];

    // Previous Page Button
    buttons.push(
      <Button
        variant="light"
        className="border"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        key="prev"
      >
        &laquo;
      </Button>
    );

    // Add page numbers with ellipsis if necessary
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Previous Ellipsis
    if (startPage > 1) {
      buttons.push(
        <Button
          key="ellipsis-start"
          variant="light"
          className="border"
          disabled
        >
          ...
        </Button>
      );
    }

    // Page Number Buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "light"}
          className={`border mx-1 ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Next Ellipsis
    if (endPage < totalPages) {
      buttons.push(
        <Button key="ellipsis-end" variant="light" className="border" disabled>
          ...
        </Button>
      );
    }

    // Next Page Button
    buttons.push(
      <Button
        variant="light"
        className="border"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        key="next"
      >
        &raquo;
      </Button>
    );

    return buttons;
  };

  return (
    <div className="pagination mb-3 justify-content-center">
      {renderPaginationButtons()}
    </div>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default Paginate;
