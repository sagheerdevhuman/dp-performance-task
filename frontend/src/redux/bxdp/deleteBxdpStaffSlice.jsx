import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteBxdpStaff } from "../../services/bxdp/deleteBxdpStaff";

export const removeBxdpStaff = createAsyncThunk(
  "deleteBxdpStaff/removeBxdpStaff",
  async ({ user_id }) => {
    const data = deleteBxdpStaff({ user_id });
    return data;
  }
);

const removeBxdpStaffSlice = createSlice({
  name: "deleteBxdpStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeBxdpStaff.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeBxdpStaff.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeBxdpStaff.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeBxdpStaffSlice.reducer;
