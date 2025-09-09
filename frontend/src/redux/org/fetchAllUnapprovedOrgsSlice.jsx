import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUnapprovedOrgs } from "../../services/org/fetchAllUnapprovedOrgs";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllUnapprovedOrgs = createAsyncThunk(
  "fetchAllUnapprovedOrgs/getAllUnapprovedOrgs",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllUnapprovedOrgs();
    return data;
  }
);

const getAllUnapprovedOrgsSlice = createSlice({
  name: "fetchAllUnapprovedOrgs",
  initialState: {
    status: null,
    orgsStatus: null,
  },

  extraReducers: {
    [getAllUnapprovedOrgs.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllUnapprovedOrgs.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgs = payload;
    },
    [getAllUnapprovedOrgs.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllUnapprovedOrgsSlice.reducer;
