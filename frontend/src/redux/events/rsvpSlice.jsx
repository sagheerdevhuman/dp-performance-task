import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rsvp } from "../../services/events/rsvp";

export const newRSVP = createAsyncThunk(
  "rsvp/newRSVP",
  async ({
    user_id,
    event_id,
  }) => {
    const data = rsvp({
      user_id,
      event_id,
    });
    return data;
  }
);

const rsvpSlice = createSlice({
  name: "rsvp",
  initialState: { status: null, rsvp: null },

  extraReducers: {
    [newRSVP.pending]: (state, action) => {
      state.status = "loading...";
    },
    [newRSVP.fulfilled]: (state, action) => {
      state.status = "success";
      state.rsvp = action.payload;
    },
    [newRSVP.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default rsvpSlice.reducer;
