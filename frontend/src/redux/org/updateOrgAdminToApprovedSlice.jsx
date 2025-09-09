import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateOrgAdminToApproved } from "../../services/org/updateOrgAdminToApproved";

export const updateOrgAdminStatus = createAsyncThunk(
  "updateOrgAdminToApproved/updateOrgAdminStatus",
  async ({ org_id, user_id, is_approved }) => {
    const data = updateOrgAdminToApproved({ org_id, user_id, is_approved });
    return data;
  }
);

const editOrgAdminStatusSlice = createSlice({
  name: "updateOrgAdminToApproved",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [updateOrgAdminStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateOrgAdminStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgAdminStatus = payload;
    },
    [updateOrgAdminStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default editOrgAdminStatusSlice.reducer;
