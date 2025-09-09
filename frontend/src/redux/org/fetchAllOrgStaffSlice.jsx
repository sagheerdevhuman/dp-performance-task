import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrgStaff } from "../../services/org/fetchAllOrgStaff";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllOrgStaff = createAsyncThunk(
  "org/fetchAllOrgStaff",

  async ({ userToken, orgId }) => {
    if (userToken) {
      setAuthToken({ userToken });
    }
    const data = fetchAllOrgStaff({ orgId });
    return data;
  }
);

const getAllOrgStaffSlice = createSlice({
  name: "org",
  initialState: {
    status: null,
    staff: null,
  },

  extraReducers: {
    [getAllOrgStaff.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllOrgStaff.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.staff = payload;
    },
    [getAllOrgStaff.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllOrgStaffSlice.reducer;
