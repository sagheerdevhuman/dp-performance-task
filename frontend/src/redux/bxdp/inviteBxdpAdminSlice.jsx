import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteBxdpAdmin } from "../../services/bxdp/inviteBxdpAdmin";

export const bxdpAdminInviteStatus = createAsyncThunk(
  "invite/bxdpAdminInviteStatus",
  async ({ firstName, lastName, email, isMetaAdmin, isBxdpAdmin }) => {
    const data = inviteBxdpAdmin({
      firstName,
      lastName,
      email,
      isMetaAdmin,
      isBxdpAdmin,
    });

    return data;
  }
);

const bxdpAdminInviteStatusSlice = createSlice({
  name: "inviteBxdpAdmin",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [bxdpAdminInviteStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [bxdpAdminInviteStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
    },
    [bxdpAdminInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default bxdpAdminInviteStatusSlice.reducer;
