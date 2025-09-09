import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateOrgAdmin } from "../services/updateOrgAdmin";

export const updateAdminData = createAsyncThunk(
  "updateOrgAdmin/updateAdminData",
  async ({
    user_id,
    org_id,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    passwordResetRequired,
    mou,
    isApproved,
    isActive,
    isAdminManager,
    isOrgAdmin,
    isOrgManager,
    isOrgStaff,
    isUser,
    wasInvited,
  }) => {
    const data = updateOrgAdmin({
      user_id,
      org_id,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      passwordResetRequired,
      mou,
      isApproved,
      isActive,
      isAdminManager,
      isOrgAdmin,
      isOrgManager,
      isOrgStaff,
      isUser,
      wasInvited,
    });

    return data;
  }
);

const updateOrgAdminSlice = createSlice({
  name: "updateOrgAdmin",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [updateAdminData.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateAdminData.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [updateAdminData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateOrgAdminSlice.reducer;
