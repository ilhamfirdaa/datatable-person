import React, { useState, useContext } from 'react';
import useFetch from './useFetch';

const AppContext = React.createContext();

// eslint-disable-next-line
const AppProvider = ({ children }) => {
  const totalResults = 20;
  const [keyword, setKeyword] = useState('');
  const [gender, setGender] = useState('all');
  const [activePage, setActivePage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [rowShow, setRowShow] = useState(5);

  // set query params for filter table
  let queryParams = `page=${activePage}&pageSize=${rowShow}&results=${totalResults}`;
  if (gender !== 'all') { queryParams += `&gender=${gender}`; }
  if (keyword) { queryParams += `&keyword=${keyword}`; }
  if (sortBy) { queryParams += `&sortBy=${sortBy}`; }
  if (sortOrder) { queryParams += `&sortOrder=${sortOrder}`; }

  const { isLoading, error, data: personData } = useFetch(`${queryParams}`);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        personData,
        totalResults,
        keyword,
        setKeyword,
        gender,
        setGender,
        activePage,
        setActivePage,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        rowShow,
        setRowShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
