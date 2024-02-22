import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import SkeletonTable from './SkeletonTable';

const TablePerson = () => {
  const tableHeader = ['username', 'name', 'email', 'gender', 'date'];
  const [person, setPerson] = useState(false);

  const {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    activePage,
    rowShow,
    isLoading,
    personData,
  } = useGlobalContext();

  const handleClickSort = (val) => {
    if (val !== sortBy) {
      setSortOrder('asc');
    } else {
      // eslint-disable-next-line
      if(sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortOrder('asc');
      }
    }
    setSortBy(val);
  };

  useEffect(() => {
    const tempData = [];
    if (personData) {
      personData.forEach((el) => {
        tempData.push({
          username: el.login.username,
          name: `${el.name.first} ${el.name.last}`,
          email: el.email,
          gender: el.gender,
          date: el.registered.date,
        });
      });
    }

    if (sortBy) {
      if (sortOrder === 'asc') {
        // sorting data order ascending
        tempData.sort((a, b) => {
          const fa = a[sortBy].toLowerCase();
          const fb = b[sortBy].toLowerCase();

          if (fa < fb) { return -1; }
          if (fa > fb) { return 1; }
          return 0;
        });
      } else {
        // sorting data order descending
        tempData.sort((a, b) => {
          const fa = a[sortBy].toLowerCase();
          const fb = b[sortBy].toLowerCase();

          if (fa > fb) { return -1; }
          if (fa < fb) { return 1; }
          return 0;
        });
      }
    }

    // display the number of data rows refers to the show filter
    const sliced = tempData.slice((activePage - 1) * rowShow);
    if (sliced.length > rowShow) {
      sliced.splice(rowShow);
    }

    setPerson(sliced);
  }, [personData, activePage, rowShow, sortBy, sortOrder]);

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="table-auto w-full text-xs md:text-base border-t border-b border-gray-400">
        <thead>
          <tr className="border-t border-b border-gray-400">
            <th className="p-2">No</th>
            {tableHeader.map((column) => (
              <th key={column} className="p-2 hover:bg-blue-100">
                <div
                  className="flex justify-between cursor-pointer"
                  role="columnheader"
                  onClick={() => handleClickSort(column)}
                >
                  <span>
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </span>
                  {sortBy === column && sortOrder === 'asc' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${sortBy === column && 'text-blue-500'} h-4 w-4 md:h-6 md:w-6`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${sortBy === column && 'text-blue-500'} h-4 w-4 md:h-6 md:w-6`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { isLoading ? (
            <tr>
              <SkeletonTable />
            </tr>
          ) : person.length > 0
            ? (
              <>
                {
                person.map((el, index) => (
                  <tr key={el.username} className={`${index % 2 === 0 && 'bg-gray-200'} border-t border-b border-gray-400 hover:bg-blue-100`}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{el.username}</td>
                    <td className="p-2">{el.name}</td>
                    <td className="p-2">{el.email}</td>
                    <td className="p-2">{el.gender}</td>
                    <td className="p-2">{el.date}</td>
                  </tr>
                ))
              }
              </>
            )
            : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Data not found
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePerson;
