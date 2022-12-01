import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectFilterOriginalLaunch,
  selectFilterStatus,
  selectFilterType,
  setFilterStatus,
  setFilterOriginalLaunch,
  setFilterType,
  filterCapsules, selectCapsules,
} from '../store/capsuleSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const status = useSelector(selectFilterStatus);
  const type = useSelector(selectFilterType);
  const capsules = useSelector(selectCapsules);
  const originalLaunch = useSelector(selectFilterOriginalLaunch);

  return (
      <div className="w-full mx-auto max-w-7xl mb-10 border-b border-gray-200">
        <form className="bg-white max-w-screen-xl" onSubmit={(event) => {
          event.preventDefault();
          let filteredCapsules = capsules.filter((capsule) => {
            let statusFilterPassed = true;
            let typeFilterPassed = true;
            let launchDateFilterPassed = true;
            if (status !== 'all') {
              statusFilterPassed = (capsule.status === status);
            }
            if (type && type.length > 0) {
              typeFilterPassed = (capsule.type.indexOf(type) !== -1);
            }
            if (!capsule.original_launch && originalLaunch &&
                originalLaunch.length > 0) {
              launchDateFilterPassed = false;
            } else if (originalLaunch && originalLaunch.length > 0) {
              let date1 = new Date(originalLaunch + ' 00:00:00').toUTCString();
              let date2 = new Date(originalLaunch + ' 23:59:59').toUTCString();
              let gmtDate1 = new Date(date1).getTime();
              let gmtDate2 = new Date(date2).getTime();
              console.log(date1, date2, capsule.original_launch);
              let capsuleDate = new Date(capsule.original_launch).getTime();
              launchDateFilterPassed = (capsuleDate >= gmtDate1 &&
                  capsuleDate <= gmtDate2);
            }

            return statusFilterPassed && typeFilterPassed &&
                launchDateFilterPassed;
          });
          dispatch(filterCapsules(filteredCapsules));
        }}>
          <div className="flex flex-wrap my-6">
            <div className="w-full md:w-1/4 px-3 my-6">
              <select value={status}
                      onChange={(event) => {
                        dispatch(setFilterStatus(event.target.value));
                      }}
                      className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="all">All Capsules</option>
                <option value="active">Upcoming Capsules</option>
                <option value="retired">Past Capsules</option>
                <option value="destroyed">Destroyed Capsules</option>
                <option value="unknown">Unknown Capsules</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-3 my-6">
              <input
                  onChange={(event) => {
                    dispatch(setFilterOriginalLaunch(event.target.value));
                  }}
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date" placeholder="Select launch date"
                  value={originalLaunch}/>
            </div>
            <div className="w-full md:w-1/4 px-3 my-6">
              <input
                  onChange={(event) => {
                    dispatch(setFilterType(event.target.value));
                  }}
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text" placeholder="Capsule type" value={type}/>
            </div>
            <div className="w-full md:w-1/4 px-3 my-6">
              <button
                  className="bg-indigo-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">Filter Capsules
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}
