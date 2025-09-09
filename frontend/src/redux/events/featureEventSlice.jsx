import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featureEvent } from "../../services/events/featureEvent";

export const eventFeatureStatus = createAsyncThunk(
  "featureEvent/event/eventFeatureStatus",
  async ({ event_id }) => {
    const data = featureEvent({ event_id });
    return data;
  }
);

const featureEventSlice = createSlice({
  name: "featureEvent",
  initialState: {
    status: null,
    featureStatus: null,
  },

  extraReduscers: {
    [eventFeatureStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [eventFeatureStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.featureStatus = payload;
    },
    [eventFeatureStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default featureEventSlice.reducer;
