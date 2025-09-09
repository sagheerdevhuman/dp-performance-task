import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orgStaffToUser } from "../../services/org/orgStaffToUser";

export const changeStaffToUser = createAsyncThunk(
  "orgStaffToUser/changeStaffToUser",
  async ({ user_id, org_id }) => {
    const data = orgStaffToUser({ user_id, org_id });
    return data;
  }
);

const orgStaffToUserSlice = createSlice({
  name: "orgStaffToUser",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeStaffToUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeStaffToUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeStaffToUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgStaffToUserSlice.reducer;
