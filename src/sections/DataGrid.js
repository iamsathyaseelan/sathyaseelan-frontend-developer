import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCapsulesPage,
  selectCapsulesPerPage,
  setPageNumber,
  selectFilteredCapsules, selectCapsulesStatus,
} from '../store/capsuleSlice';
import Pagination from '../components/Pagination';
import CapsuleDetails from '../components/CapsuleDetails';

export default function DataGrid() {
  const itemsPerPage = useSelector(selectCapsulesPerPage);
  const pageNumber = useSelector(selectCapsulesPage);
  const capsules = useSelector(selectFilteredCapsules);
  const capsulesStatus = useSelector(selectCapsulesStatus);
  const dispatch = useDispatch();
  const [selectedCapsule, setSelectedCapsule] = React.useState({});
  const [showCapsuleDetails, setShowCapsuleDetails] = React.useState(false);

  if (capsulesStatus === 'loading') {
    return <div
        className="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
      <p className="text-center">Please wait, Capsules are loading!</p>
    </div>;
  }

  let capsulesOfThePage = capsules.slice((pageNumber - 1) * itemsPerPage,
      pageNumber * itemsPerPage);

  if (capsules.length <= 0) {
    return <div
        className="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
      <p className="text-center">Now capsules found!</p>
    </div>;
  }

  return (
      <div
          className="mx-auto max-w-2xl py-5 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
            className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
          {capsulesOfThePage.map((capsule) => (
              <div key={capsule.capsule_serial} onClick={() => {
                setSelectedCapsule(capsule);
                setShowCapsuleDetails(true);
              }}
                   className="group relative bg-white border-2 rounded p-5 cursor-pointer">
                <div className="block">
                  <div>
                    <p className="text-sm text-gray-700 mb-2"><b>Serial
                      Number:</b> {capsule.capsule_serial}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <b>Type:</b> {capsule.type}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <b>Status:</b> {capsule.status}</p>
                    <p className="mt-1 text-sm text-gray-500">{capsule.details}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
        <Pagination
            pageNumber={pageNumber} itemsPerPage={itemsPerPage}
            onChangePage={(pageToNavigate) => {
              if (pageNumber !== pageToNavigate) {
                dispatch(setPageNumber(pageToNavigate));
              }
            }} totalItems={capsules.length}/>
        <CapsuleDetails onClose={() => {
          setShowCapsuleDetails(false);
        }} show={showCapsuleDetails} capsule={selectedCapsule}/>
      </div>
  );
}
