import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteOrgAdmin } from "../../services/org/inviteOrgAdmin";

export const orgAdminInviteStatus = createAsyncThunk(
  "invite/orgAdminInviteStatus",
  async ({
    org_id,
    firstName,
    lastName,
    email,
    isOrgAdmin,
    isOrgManager,
    isOrgUser,
  }) => {
    const data = inviteOrgAdmin({
      org_id,
      firstName,
      lastName,
      email,
      isOrgAdmin,
      isOrgManager,
      isOrgUser,
    });

    return data;
  }
);

const orgAdminInviteStatusSlice = createSlice({
  name: "inviteOrgAdmin",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [orgAdminInviteStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgAdminInviteStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
    },
    [orgAdminInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgAdminInviteStatusSlice.reducer;
