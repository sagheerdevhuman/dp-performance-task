import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateOrgUser } from "../../services/user/updateOrgUser";

export const updateOrgUserStatus = createAsyncThunk(
  "updateOrgUser/updateOrgUserStatus",
  async ({ user_id }) => {
    const data = updateOrgUser({  user_id });
    return data;
  }
);

const editOrgUserSlice = createSlice({
  name: "updateOrgUser",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [updateOrgUserStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateOrgUserStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgAdminStatus = payload;
    },
    [updateOrgUserStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default editOrgUserSlice.reducer;
