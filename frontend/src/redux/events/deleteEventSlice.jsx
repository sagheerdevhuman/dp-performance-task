import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteEvent } from "../../services/events/deleteEvent";

export const removeEvent = createAsyncThunk(
  "deleteEvent/removeEvent",
  async ({ event_id }) => {
    const data = deleteEvent({ event_id });
    return data;
  }
);

const removeEventSlice = createSlice({
  name: "deleteEvent",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeEvent.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeEvent.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeEvent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeEventSlice.reducer;
