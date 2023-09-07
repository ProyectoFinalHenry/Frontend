import React, { useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { BiChevronLeft, BiChevronRight, BiFirstPage, BiLastPage } from 'react-icons/bi';

import './PaginationButtons.css'

const PaginationButtons = ({ currentPage, totalPages, setCurrentPage }) => {


   const navigate = useNavigate();
   const params = useParams();
   currentPage = parseInt(params.page);
   const handlePage = (e) => {
      const buttonValue = e.currentTarget.name;

    
      let newPage = currentPage; 
    
      if (!isNaN(parseInt(buttonValue))) {
        setCurrentPage(parseInt(buttonValue));
        navigate(`/products/page/${parseInt(buttonValue)}`);
      }
      if (e.currentTarget.name === "PREV") {
        newPage = currentPage - 1; 
        setCurrentPage(newPage);
        navigate(`/products/page/${newPage}`);
      }
      if (e.currentTarget.name === "NEXT") {
        newPage = currentPage + 1; 
        setCurrentPage(newPage);
        navigate(`/products/page/${newPage}`);
      }
    };
    

   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <div className="home-btn-paginado">
         {currentPage > 1 && (
            <>
               <button onClick={handlePage} name='1'><BiFirstPage /></button>
               <button className="home-btn-prev" onClick={handlePage} name='PREV'><BiChevronLeft /></button>
            </>
         )}
         {pages.map((page) => (
            (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) && (
               <button
                  key={page}
                  className={currentPage === page ? 'current-page' : ''}
                  onClick={handlePage}
                  name={page}
               >
                  {page}
               </button>
            )
         ))}
         {currentPage < totalPages && (
            <>
               <button className="home-btn-next" onClick={handlePage} name='NEXT'><BiChevronRight /></button>
               <button onClick={handlePage} name={totalPages}><BiLastPage /></button>
            </>
         )}
      </div>
   );
};

export default PaginationButtons;

