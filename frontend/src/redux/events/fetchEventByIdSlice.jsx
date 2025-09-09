import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEventById } from "../../services/events/fetchEventById";

export const getEventById = createAsyncThunk(
  "event/fetchEvent",

  async ({ event_id }) => {
    const data = fetchEventById({ event_id});
    return data;
  }
);

const getEventByIdSlice = createSlice({
  name: "event",
  initialState: {
    status: null,
    
  },

  extraReducers: {
    [getEventById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getEventById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.event = payload;
    },
    [getEventById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getEventByIdSlice.reducer;
