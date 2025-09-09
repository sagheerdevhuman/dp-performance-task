import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrgById } from "../../services/org/fetchOrgById";
import setAuthToken from "../../utilities/setAuthToken";

export const getOrgById = createAsyncThunk(
  "fetchOrgById/getOrgById",
  async ({ orgId, userToken }) => {
    // console.log(`ID:${orgId}`);
    // console.log(`userToken:${userToken}`);
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = fetchOrgById(orgId);
    return data;
  }
);

const getOrgByIdSlice = createSlice({
  name: "fetchOrg",
  initialState: { status: null, org: null },

  extraReducers: {
    [getOrgById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getOrgById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.org = payload;
    },
    [getOrgById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getOrgByIdSlice.reducer;
