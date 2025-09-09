import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateEvent } from "../../services/events/activateEvent";

export const eventActiveStatus = createAsyncThunk(
  "activateEvent/eventActiveStatus",

  async ({ event_id }) => {
    const data = activateEvent({ event_id});
    return data;
  }
);

const activateEventSlice = createSlice({
  name: "activateEvent",
  initialState: {
    status: null,
    eventStatus: null,
  },

  extraReduscers: {
    [eventActiveStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [eventActiveStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.eventStatus = payload;
    },
    [eventActiveStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activateEventSlice.reducer;
