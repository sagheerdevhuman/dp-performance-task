import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllTags } from "../../services/events/fetchAllTags";

import setAuthToken from "../../utilities/setAuthToken";

export const getAllTags = createAsyncThunk(
  "fetchAllTags/getAllTags",

  async () => {
    console.log("fgfjgj")
    const data = fetchAllTags();
    return data;
  }
);

const getAllTagsSlice = createSlice({
  name: "fetchAllTags",
  initialState: {
    status: null,
    tags: [],
    error: null,
  },

  reducers: {
    clearTagsStatus: (state) => {
      state.status = null;
      state.error = null;
    },
    clearTagsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [getAllTags.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllTags.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.tags = payload;
      state.error = null;
    },
    [getAllTags.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearTagsStatus, clearTagsError } = getAllTagsSlice.actions;
export default getAllTagsSlice.reducer;
