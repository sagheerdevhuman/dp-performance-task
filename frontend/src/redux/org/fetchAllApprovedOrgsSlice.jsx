import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllApprovedOrgs } from "../../services/org/fetchAllApprovedOrgs";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllApprovedOrgs = createAsyncThunk(
  "fetchAllApprovedOrgs/getAllApprovedOrgs",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllApprovedOrgs();
    return data;
  }
);

const getAllApprovedOrgsSlice = createSlice({
  name: "fetchAllApprovedOrgs",
  initialState: {
    status: null,
    orgsStatus: null,
  },

  extraReducers: {
    [getAllApprovedOrgs.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllApprovedOrgs.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgs = payload;
    },
    [getAllApprovedOrgs.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllApprovedOrgsSlice.reducer;
