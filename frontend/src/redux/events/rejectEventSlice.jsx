import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejectEvent } from "../../services/events/rejectEvent";

export const eventRejectionStatus = createAsyncThunk(
  "rejectEvent/event/RejectionStatus",
  async ({ event_id, user_id, reason }) => {
    const data = rejectEvent({ event_id, user_id, reason });
    return data;
  }
);

const eventApprovalStatusSlice = createSlice({
  name: "rejectEvent",
  initialState: {
    status: null,
    approvalStatus: null,
  },

  extraReduscers: {
    [eventRejectionStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [eventRejectionStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.approvalStatus = payload;
    },
    [eventRejectionStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default eventApprovalStatusSlice.reducer;
