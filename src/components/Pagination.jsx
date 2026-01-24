import "../App.css";
import { FaAngleRight,FaAngleLeft } from "react-icons/fa";


const Pagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null;

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={goToPrev} disabled={currentPage === 1}>
      <FaAngleLeft />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}

      <button onClick={goToNext} disabled={currentPage === totalPages}>
      <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;

  
 
  