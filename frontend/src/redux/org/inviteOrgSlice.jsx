import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inviteOrg } from "../../services/org/inviteOrg";
import setAuthToken from "../../utilities/setAuthToken";

export const orgInviteStatus = createAsyncThunk(
  "inviteOrg/orgInviteStatus",
  async ({ userToken, name, firstName, lastName, infoEmail, logoUrl, bannerUrl }) => {
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = inviteOrg({
      name,
      firstName,
      lastName,
      infoEmail,
      logoUrl,
      bannerUrl
    });
    return data;
  }
);

const orgInviteStatusSlice = createSlice({
  name: "inviteOrg",
  initialState: { isAuthenticated: null, status: null, user: null },

  extraReducers: {
    [orgInviteStatus.pending]: (state, action) => {
      state.status = "loading...";
    },
    [orgInviteStatus.fulfilled]: (state, action) => {
      state.status = "success";
      state.orgStatus = action.payload;
      state.isAuthenticated = "true";
    },
    [orgInviteStatus.rejected]: (state, action) => {
      state.status = "failed";
      state.isAuthenticated = "false";
    },
  },
});

export default orgInviteStatusSlice.reducer;
