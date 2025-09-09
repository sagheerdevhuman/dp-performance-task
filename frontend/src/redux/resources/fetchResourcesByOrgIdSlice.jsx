import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchResourcesByOrgId } from "../../services/resources/fetchResourcesByOrgId";

export const getResourcesByOrgId = createAsyncThunk(
  "resource/fetchResourcesByOrgId",

  async ({ org_id }) => {
    const data = await fetchResourcesByOrgId(org_id);
    return data;
  }
);

const getResourcesByOrgIdSlice = createSlice({
  name: "resourceByOrg",
  initialState: {
    status: null,
    resourcesByOrg: [],
  },

  extraReducers: {
    [getResourcesByOrgId.pending]: (state, action) => {
      state.status = "loading";
    },
    [getResourcesByOrgId.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.resourcesByOrg = payload;
    },
    [getResourcesByOrgId.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getResourcesByOrgIdSlice.reducer; 