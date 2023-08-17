// PaginationButtons.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './PaginationButtons.css'

const PaginationButtons = ({ currentPage, totalPages, setCurrentPage }) => {

   const navigate = useNavigate();


  const handlePage = (e) => {
    const buttonValue = e.target.name;
    if (!isNaN(parseInt(buttonValue))) {
      setCurrentPage(parseInt(buttonValue));
      navigate(`/products/page/${parseInt(buttonValue)}`);
    }
    if (e.target.name === "PREV") {
      setCurrentPage(currentPage - 1);
      navigate(`/products/page/${parseInt(currentPage - 1)}`);
    }
    if (e.target.name === "NEXT") {
      setCurrentPage(currentPage + 1);
      navigate(`/products/page/${parseInt(currentPage + 1)}`);
    }
  };

  const pages =
    totalPages <= 2
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : Array.from({ length: 5 }, (_, i) => currentPage + i - 2).filter(
          (page) => page > 0 && page <= totalPages
        );
  const hideButtonA = currentPage <= 2;
  const hideButtonB = currentPage >= totalPages - 1;



  return (
        <div className="home-btn-paginado"> 

             <button disabled={currentPage === 1} onClick={handlePage} name='1'>1</button>
             <button className="home-btn-prev" disabled={currentPage === 1} onClick={handlePage} name='PREV'>PREV</button>
             {!hideButtonA && <button className="home-btn-points">...</button>}
             {pages.map((page) => (
             <button
              key={page}
              className={currentPage === page ? 'current-page' : ''}
              onClick={handlePage} name={page}
              >
             {page}
             </button>
             ))}
             {totalPages === 2 && <button key="2" disabled={currentPage === 2} onClick={handlePage} name='2'>2</button>}
             {!hideButtonB && <button className="home-btn-points">...</button>}
             <button className="home-btn-next" disabled={currentPage === totalPages} onClick={handlePage} name='NEXT'>NEXT</button>
             <button disabled={currentPage === totalPages} onClick={handlePage} name={totalPages}>{totalPages}</button>

        </div>
  );
};

export default PaginationButtons;