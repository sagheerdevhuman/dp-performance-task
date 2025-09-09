import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOrgStaff } from "../../services/org/deleteOrgStaff";

export const removeOrgStaff = createAsyncThunk(
  "deleteOrgStaff/removeOrgStaff",
  async ({ user_id, org_id }) => {
    const data = deleteOrgStaff({ user_id, org_id });
    return data;
  }
);

const removeOrgStaffSlice = createSlice({
  name: "deleteOrgStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeOrgStaff.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeOrgStaff.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeOrgStaff.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeOrgStaffSlice.reducer;
