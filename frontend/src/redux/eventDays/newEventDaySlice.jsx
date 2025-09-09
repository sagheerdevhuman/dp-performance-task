import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newEventDay } from "../services/eventDays/newEventDay";

export const createEvent = createAsyncThunk(
  "newEvent/createEventDay",
  async ({ event_id, days }) => {
    const data = newEvent({
      event_id,
      days,
    });
    return data;
  }
);

const newEventSlice = createSlice({
  name: "newEvent",
  initialState: { eventDay: null, status: null },

  extraReducers: {
    [createEvent.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.eventDay = action.payload;
    },
    [createEvent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newEventDaySlice.reducer;
