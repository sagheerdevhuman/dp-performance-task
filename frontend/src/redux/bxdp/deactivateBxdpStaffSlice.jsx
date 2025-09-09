import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deactivateBxdpStaff } from "../../services/bxdp/deactivateBxdpStaff";

export const changeActiveToDeactiveBxdp = createAsyncThunk(
  "deactivateBxdpStaff/changeActiveToDeactiveBxdp",
  async ({ user_id }) => {
    const data = deactivateBxdpStaff({ user_id });
    return data;
  }
);

const deactivateBxdpStaffSlice = createSlice({
  name: "deactivateBxdpStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeActiveToDeactiveBxdp.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeActiveToDeactiveBxdp.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeActiveToDeactiveBxdp.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deactivateBxdpStaffSlice.reducer;
