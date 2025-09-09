import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllResources } from "../../services/resources/fetchAllResources";

export const getResourceList = createAsyncThunk(
  "resource/fetchAllResources",

  async ({ user_id }) => {
    const data = await fetchAllResources(user_id);
    return data;
  }
);

const getResourceListSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    resourceList: [],
  },

  extraReducers: {
    [getResourceList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getResourceList.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.resourceList = payload;
    },
    [getResourceList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getResourceListSlice.reducer; 