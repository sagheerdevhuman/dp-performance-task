import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteMetaAdmin } from "../../services/bxdp/inviteMetaAdmin";

export const metaAdminInviteStatus = createAsyncThunk(
  "invite/metaAdminInviteStatus",
  async ({ firstName, lastName, email, isMetaAdmin, isBxdpAdmin }) => {
    const data = inviteMetaAdmin({
      firstName,
      lastName,
      email,
      isMetaAdmin,
      isBxdpAdmin,
    });

    return data;
  }
);

const metaAdminInviteStatusSlice = createSlice({
  name: "inviteMetaAdmin",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [metaAdminInviteStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [metaAdminInviteStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
    },
    [metaAdminInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default metaAdminInviteStatusSlice.reducer;
