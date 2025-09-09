import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveEvent } from "../../services/events/approveEvent";

export const eventApprovalStatus = createAsyncThunk(
  "approveEvent/event/ApprovalStatus",
  async ({ event_id }) => {
    const data = approveEvent({ event_id });
    return data;
  }
);

const eventApprovalStatusSlice = createSlice({
  name: "approveEvent",
  initialState: {
    status: null,
    approvalStatus: null,
  },

  extraReduscers: {
    [eventApprovalStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [eventApprovalStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.approvalStatus = payload;
    },
    [eventApprovalStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default eventApprovalStatusSlice.reducer;
