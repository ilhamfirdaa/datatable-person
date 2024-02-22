import React from 'react';
import { useGlobalContext } from '../context';

const FormFilter = () => {
  const {
    keyword,
    setKeyword,
    gender,
    setGender,
    rowShow,
    setRowShow,
    setActivePage,
    setSortBy,
    setSortOrder,
  } = useGlobalContext();

  const handleChangeSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleChangeShow = (e) => {
    setRowShow(e.target.value);
    setActivePage(1);
  };

  const handleResetFilter = () => {
    setGender('all');
    setKeyword('');
    setSortBy(null);
    setSortOrder(null);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mt-4 max-w-2xl">
      <div className="w-full md:w-max">
        <label>Search</label>
        <br />
        <div className="flex">
          <input
            id="search-form"
            type="text"
            className="w-full px-4 py-1 border-2 border-r-0 border-gray-300 focus:outline-none rounded rounded-r-none"
            placeholder="Type search here..."
            value={keyword}
            onChange={handleChangeSearch}
          />
          <i className="border-2 border-l-0 border-gray-300 rounded rounded-l-none pt-1 pr-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </i>
        </div>
      </div>

      <div className="w-full md:w-max">
        <label>Gender</label>
        <br />
        <select
          onChange={handleChangeGender}
          value={gender}
          className="w-full px-4 py-1 border-2 border-gray-300 rounded focus:outline-none"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="w-full md:w-max">
        <label>Rows per page</label>
        <br />
        <select
          onChange={handleChangeShow}
          value={rowShow}
          className="w-full px-4 py-1 border-2 border-gray-300 rounded focus:outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="w-full md:w-max">
        <button
          type="button"
          className="w-full px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FormFilter;
