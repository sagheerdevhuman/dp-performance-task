import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orgStaffToAdmin } from "../../services/org/orgStaffToAdmin";

export const changeStaffToAdmin = createAsyncThunk(
  "orgStaffToAdmin/changeStaffToAdmin",
  async ({ user_id, org_id }) => {
    const data = orgStaffToAdmin({ user_id, org_id });
    return data;
  }
);

const changeStaffToAdminSlice = createSlice({
  name: "orgStaffToAdmin",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeStaffToAdmin.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeStaffToAdmin.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeStaffToAdmin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeStaffToAdminSlice.reducer;
