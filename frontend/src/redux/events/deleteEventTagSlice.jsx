import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteEventTag } from "../../services/events/deleteEventTag";

export const removeEventTag = createAsyncThunk(
  "deleteEventTag/removeEventTag",
  async ({ event_id, tag_id }) => {
    const data = deleteEventTag({ event_id, tag_id });
    return data;
  }
);

const removeEventTagSlice = createSlice({
  name: "deleteEventTag",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeEventTag.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeEventTag.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeEventTag.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeEventTagSlice.reducer;
