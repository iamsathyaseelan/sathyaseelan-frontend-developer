import React from 'react';

export default function Pagination({
                                     pageNumber = 1,
                                     itemsPerPage = 10,
                                     totalItems = 0,
                                     onChangePage = () => {
                                     },
                                   }) {
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 0) {
    return <></>;
  }
  let allPages = Array.from(Array(totalPages).keys());
  return (
      <div
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <span
              onClick={() => {
                if (pageNumber > 1) {
                  onChangePage(pageNumber - 1);
                }
              }}
              className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </span>
          <span
              onClick={() => {
                if (pageNumber < totalPages) {
                  onChangePage(pageNumber + 1);
                }
              }}
              className="relative ml-3 cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </span>
        </div>
        <div
            className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{((pageNumber - 1) *
                itemsPerPage) + 1}</span> to <span
                className="font-medium">{pageNumber *
            itemsPerPage}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
                className="isolate inline-flex cursor-pointer -space-x-px rounded-md shadow-sm"
                aria-label="Pagination">
              {
                allPages.map((newPageNumber) => {
                  return <span
                      onClick={() => {
                        onChangePage(newPageNumber + 1);
                      }}
                      key={`page-number-${newPageNumber}`}
                      className={pageNumber === newPageNumber + 1 ?
                          'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20':
                          'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'}
                  >
                    {newPageNumber + 1}
                  </span>;
                })
              }
            </nav>
          </div>
        </div>
      </div>
  );
}
