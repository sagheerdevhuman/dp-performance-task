import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateBxdpStaff } from "../../services/bxdp/activateBxdpStaff";

export const changeDeactiveToActiveBxdp = createAsyncThunk(
  "activateBxdpStaff/changeDeactiveToActiveBxdp",
  async ({ user_id }) => {
    const data = activateBxdpStaff({ user_id });
    return data;
  }
);

const activateBxdpStaffSlice = createSlice({
  name: "activateBxdpStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeDeactiveToActiveBxdp.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeDeactiveToActiveBxdp.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeDeactiveToActiveBxdp.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activateBxdpStaffSlice.reducer;
