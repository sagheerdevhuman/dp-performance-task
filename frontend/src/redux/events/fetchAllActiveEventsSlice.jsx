import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllActiveEvents } from "../../services/events/fetchAllActiveEvents";

export const getAllActiveEvents = createAsyncThunk(
  "event/fetchActiveEvents",

  async () => {
    const data = fetchAllActiveEvents();
    return data;
  }
);

const getAllActiveEventsSlice = createSlice({
  name: "event",
  initialState: {
    status: null,
    event: null,
  },

  extraReducers: {
    [getAllActiveEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllActiveEvents.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.event = payload;
    },
    [getAllActiveEvents.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllActiveEventsSlice.reducer;
