import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateOrgStaff } from "../../services/org/activateOrgStaff";

export const changeDeactiveToActive = createAsyncThunk(
  "activateOrgStaff/changeDeactiveToActive",
  async ({ user_id, org_id }) => {
    const data = activateOrgStaff({ user_id, org_id });
    return data;
  }
);

const activateOrgStaffSlice = createSlice({
  name: "activateOrgStaff",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeDeactiveToActive.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeDeactiveToActive.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeDeactiveToActive.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activateOrgStaffSlice.reducer;
