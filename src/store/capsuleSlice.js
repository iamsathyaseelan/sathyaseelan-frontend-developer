import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filter: {
    status: 'all',
    original_launch: '',
    type: '',
  },
  capsuleDetails: {
    items: [],
    filteredItems: [],
    itemsPerPage: 8,
    pageNumber: 1,
    status: 'loading',
  },
};

// Create actions.
export const capsuleSlice = createSlice({
  name: 'capsule',
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setFilterType: (state, action) => {
      state.filter.type = action.payload;
    },
    setFilterOriginalLaunch: (state, action) => {
      state.filter.original_launch = action.payload;
    },
    setPageNumber: (state, action) => {
      state.capsuleDetails.pageNumber = action.payload;
    },
    filterCapsules: (state, action) => {
      state.capsuleDetails.filteredItems = action.payload;
    },
    setCapsules: (state, action) => {
      state.capsuleDetails.filteredItems = action.payload;
      state.capsuleDetails.items = action.payload;
      state.capsuleDetails.status = "loaded";
    },
  },
});

export const {
  setFilterStatus,
  setFilterOriginalLaunch,
  setFilterType,
  filterCapsules,
  setPageNumber,
  setCapsules,
} = capsuleSlice.actions;

//Select filter statuses from the state.
export const selectFilterStatus = (state) => state.capsule.filter.status;
export const selectFilterType = (state) => state.capsule.filter.type;
export const selectFilterOriginalLaunch = (state) => state.capsule.filter.original_launch;
export const selectCapsules = (state) => state.capsule.capsuleDetails.items;
export const selectFilteredCapsules = (state) => state.capsule.capsuleDetails.filteredItems;
export const selectCapsulesPerPage = (state) => state.capsule.capsuleDetails.itemsPerPage;
export const selectCapsulesPage = (state) => state.capsule.capsuleDetails.pageNumber;
export const selectCapsulesStatus = (state) => state.capsule.capsuleDetails.status;

export default capsuleSlice.reducer;
