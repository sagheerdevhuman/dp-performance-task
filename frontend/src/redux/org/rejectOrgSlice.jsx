import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejectOrg } from "../../services/org/rejectOrg";

export const orgRejectionStatus = createAsyncThunk(
  "rejectOrg/orgApprovalStatus",
  async ({ org_id, user_id, reason }) => {
    const data = rejectOrg({ org_id, user_id, reason });
    return data;
  }
);

const orgRejectionStatusSlice = createSlice({
  name: "rejectOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [orgRejectionStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgRejectionStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgAdminStatus = payload;
    },
    [orgRejectionStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgRejectionStatusSlice.reducer;
