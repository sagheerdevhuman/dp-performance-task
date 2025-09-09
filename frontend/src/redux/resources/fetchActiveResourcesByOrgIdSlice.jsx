import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchActiveResourcesByOrgId } from "../../services/resources/fetchActiveResourcesByOrgId";

export const getActiveResourcesByOrgId = createAsyncThunk(
  "resource/fetchActiveResourcesByOrgId",

  async ({ org_id }) => {
    const data = await fetchActiveResourcesByOrgId(org_id);
    return data;
  }
);

const getActiveResourcesByOrgIdSlice = createSlice({
  name: "activeResourcesByOrg",
  initialState: {
    status: null,
    activeResourcesByOrg: [],
  },

  extraReducers: {
    [getActiveResourcesByOrgId.pending]: (state, action) => {
      state.status = "loading";
    },
    [getActiveResourcesByOrgId.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.activeResourcesByOrg = payload;
    },
    [getActiveResourcesByOrgId.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getActiveResourcesByOrgIdSlice.reducer; 