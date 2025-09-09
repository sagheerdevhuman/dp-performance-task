import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orgStaffToManager } from "../../services/org/orgStaffToManager";

export const changeStaffToManager = createAsyncThunk(
  "orgStaffToManager/changeStaffToManager",
  async ({ user_id, org_id }) => {
    const data = orgStaffToManager({ user_id, org_id });
    return data;
  }
);

const orgStaffToManagerSlice = createSlice({
  name: "orgStaffToManager",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeStaffToManager.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeStaffToManager.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeStaffToManager.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgStaffToManagerSlice.reducer;
