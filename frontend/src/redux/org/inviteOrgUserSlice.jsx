import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteOrgUser } from "../../services/org/inviteOrgUser";

export const orgUserInviteStatus = createAsyncThunk(
  "invite/orgUserInviteStatus",
  async ({
    org_id,
    firstName,
    lastName,
    email,
    isOrgAdmin,
    isOrgManager,
    isOrgUser,
  }) => {
    const data = inviteOrgUser({
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

const orgUserInviteStatusSlice = createSlice({
  name: "inviteOrgUser",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [orgUserInviteStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgUserInviteStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
    },
    [orgUserInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgUserInviteStatusSlice.reducer;
