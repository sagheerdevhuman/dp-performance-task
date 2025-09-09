import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deactivateOrgStaff } from "../../services/org/deactivateOrgStaff";

export const changeActiveToDeactive = createAsyncThunk(
  "deactivateOrgStaff/changeActiveToDeactive",
  async ({ user_id, org_id }) => {
    const data = deactivateOrgStaff({ user_id, org_id });
    return data;
  }
);

const deactivateOrgStaffSlice = createSlice({
  name: "deactivateOrgStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeActiveToDeactive.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeActiveToDeactive.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeActiveToDeactive.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deactivateOrgStaffSlice.reducer;
