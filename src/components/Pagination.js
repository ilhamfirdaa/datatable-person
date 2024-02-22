import React from 'react';
import { useGlobalContext } from '../context';

const Pagination = () => {
  const {
    totalResults,
    activePage,
    setActivePage,
    rowShow,
  } = useGlobalContext();

  const lastPage = totalResults / rowShow;

  const handleChangePage = (val) => {
    setActivePage(val);
  };

  const pageNumber = [];
  for (let i = 0; i < lastPage; i++) {
    // render numbers of pagination
    pageNumber.push(
      <button
        key={i}
        type="button"
        className={`${activePage === (i + 1) ? 'font-bold border-2 text-blue-500 border-blue-500' : 'border border-gray-300'} 
        py-1 px-3 rounded hover:bg-blue-100 focus:ring-2 hover:ring-blue-500`}
        onClick={() => handleChangePage(i + 1)}
      >
        {i + 1}
      </button>,
    );
  }

  return (
    <div className="flex justify-end">
      <div className="w-4/12 flex justify-end gap-x-2 mt-4">
        <button
          type="button"
          className={`${activePage === 1 ? 'cursor-not-allowed' : 'border-gray-300'} py-1 px-2 border rounded hover:bg-blue-100 focus:ring-2 hover:ring-blue-500`}
          disabled={activePage === 1}
          onClick={() => handleChangePage(activePage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${activePage === 1 && 'text-gray-300'} h-4 w-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {pageNumber}
        <button
          type="button"
          className={`${activePage === lastPage ? 'cursor-not-allowed' : 'border-gray-300'} py-1 px-2 border rounded hover:bg-blue-100 focus:ring-2 hover:ring-blue-500`}
          disabled={activePage === lastPage}
          onClick={() => handleChangePage(activePage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${activePage === lastPage && 'text-gray-300'} h-4 w-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
