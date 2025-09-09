import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrgs } from "../../services/org/fetchAllOrgs";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllOrgs = createAsyncThunk(
  "fetchAllOrgs/getAllOrgs",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllOrgs();
    return data;
  }
);

const getAllOrgsSlice = createSlice({
  name: "fetchAllOrgs",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getAllOrgs.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllOrgs.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgs = payload;
    },
    [getAllOrgs.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllOrgsSlice.reducer;
