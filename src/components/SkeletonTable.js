import React from 'react';

const SkeletonTable = () => {
  const element = [];
  for (let i = 0; i < 6; i++) {
    element.push(
      <td key={i}>
        <div className="rounded-md p-4 w-10/12">
          <div className="h-4 bg-gray-300 rounded" />
        </div>
      </td>,
    );
  }
  return element;
};

export default SkeletonTable;
