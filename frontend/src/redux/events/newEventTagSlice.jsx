import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newEventTag } from "../../services/events/newEventTag";

export const createEventTag = createAsyncThunk(
  "newEventTag/createEventTag",
  async ({
    event_id,
    tags,
    
  }) => {
    const data = newEventTag({
      event_id,
      tags,
    });
    return data;
  }
);

const newEventTagSlice = createSlice({
  name: "newEventTag",
  initialState: { status: null, event_tag: null },

  extraReducers: {
    [createEventTag.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createEventTag.fulfilled]: (state, action) => {
      state.status = "success";
      state.event_tag = action.payload;
    },
    [createEventTag.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newEventTagSlice.reducer;
