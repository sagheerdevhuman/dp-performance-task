import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllEvents } from "../../services/events/fetchAllEvents";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllEvents = createAsyncThunk(
  "fetchAllEvents/getAllEvents",
  async ({ user_id }) => {
    const data = fetchAllEvents({user_id});
    return data;
  }
);

const getAllEventsSlice = createSlice({
  name: "fetchAllEvents",
  initialState: {
    status: null,
    events: null,
  },

  extraReducers: {
    [getAllEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllEvents.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.events = payload;
    },
    [getAllEvents.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});


export default getAllEventsSlice.reducer;
