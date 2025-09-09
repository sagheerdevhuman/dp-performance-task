import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveOrg } from "../../services/org/approveOrg";

export const orgApprovalStatus = createAsyncThunk(
  "approveOrg/orgApprovalStatus",
  async ({ org_id }) => {
    const data = approveOrg({ org_id });
    return data;
  }
);

const orgApprovalStatusSlice = createSlice({
  name: "approveOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [orgApprovalStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgApprovalStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgAdminStatus = payload;
    },
    [orgApprovalStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgApprovalStatusSlice.reducer;
