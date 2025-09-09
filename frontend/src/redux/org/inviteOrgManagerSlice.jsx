import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteOrgManager } from "../../services/org/inviteOrgManager";

export const orgManagerInviteStatus = createAsyncThunk(
  "invite/orgManagerInviteStatus",
  async ({
    org_id,
    firstName,
    lastName,
    email,
    isOrgAdmin,
    isOrgManager,
    isOrgUser,
  }) => {
    const data = inviteOrgManager({
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

const orgManagerInviteStatusSlice = createSlice({
  name: "inviteOrgManager",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [orgManagerInviteStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgManagerInviteStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
    },
    [orgManagerInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orgManagerInviteStatusSlice.reducer;
