import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogout } from "../../services/user/userLogout";
import cookie from "js-cookie";

export const signOutUser = createAsyncThunk(
  "logout/signOutUser",
  async ({ user_id }) => {
    // console.log({ user_id });
    const data = userLogout({ user_id });
    return data;
  }
);

const userLogoutSlice = createSlice({
  name: "logoutUser",
  initialState: { isAuthenticated: null, status: null, user: null },

  extraReducers: {
    [signOutUser.pending]: (state, action) => {
      state.status = "loading...";
    },
    [signOutUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.isAuthenticated = "true";
      cookie.set("userToken", action.payload.access_token);
      cookie.remove("orgId");
      cookie.remove("userId");
      cookie.remove("isAuthenticated");
      cookie.remove("firstName");
      cookie.remove("lastName");
      cookie.remove("userName");
      cookie.remove("email");
      cookie.remove("zipcode");
      cookie.remove("passwordResetRequired");
      cookie.remove("isApproved");
      cookie.remove("isActive");
      cookie.remove("isLoggedIn");
      cookie.remove("isMetaAdmin");
      cookie.remove("isBxdpAdmin");
      cookie.remove("isOrgAdmin");
      cookie.remove("isOrgManager");
      cookie.remove("isOrgUser");
      cookie.remove("isUser");
      cookie.remove("inviteToken");
      cookie.remove("wasInvited");
      cookie.remove("emailCofirmed");
      cookie.remove("profileCofirmed");
      cookie.remove("profileImage");
      cookie.remove("settings_confirmed");
    },
    [signOutUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isAuthenticated = "false";
    },
  },
});

export default userLogoutSlice.reducer;
