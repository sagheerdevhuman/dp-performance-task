import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../services/user/userLogin";
import cookie from "js-cookie";

export const fetchUser = createAsyncThunk(
  "loginUser/fetchUser",
  async ({ userEmail, userPassword }) => {
    const data = userLogin({ userEmail, userPassword });
    return data;
  }
);

const userLoginSlice = createSlice({
  name: "loginUser",
  initialState: { isAuthenticated: null, status: null, user: null },

  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading...";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.isAuthenticated = "true";
      console.log(action.payload)
      cookie.set("userToken", action.payload.access_token);
      cookie.set("orgId", action.payload.org_id);
      cookie.set("userId", action.payload.user_id);
      cookie.set("isAuthenticated", action.payload.is_approved);
      cookie.set("firstName", action.payload.first_name);
      cookie.set("lastName", action.payload.last_name);
      cookie.set("userName", `${action.payload.first_name} ${action.payload.last_name}`);
      cookie.set("email", action.payload.img.user_email);
      cookie.set("zipcode", action.payload.zipcode);
      cookie.set("passwordResetRequired", action.payload.password_reset_required);
      cookie.set("isApproved", action.payload.is_approved);
      cookie.set("isActive", action.payload.is_active);
      cookie.set("isLoggedIn", action.payload.is_logged_in);
      cookie.set("isMetaAdmin", action.payload.is_meta_admin);
      cookie.set("isBxdpAdmin", action.payload.is_bxdp_admin);
      cookie.set("isOrgAdmin", action.payload.is_org_admin);
      cookie.set("isOrgManager", action.payload.is_org_manager);
      cookie.set("isOrgUser", action.payload.is_org_user);
      cookie.set("isUser", action.payload.is_user);
      cookie.set("inviteToken", action.payload.invite_token);
      cookie.set("wasInvited", action.payload.was_invited);
      cookie.set("emailCofirmed",action.payload.email_cofirmed);
      cookie.set("profileImage", action.payload.profile_img);
      cookie.set("profileCofirmed",action.payload.profile_cofirmed);
      cookie.set("settings_confirmed",action.payload.settings_confirmed);
     
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isAuthenticated = "false";
      alert("invalid username or password")
    },
  },
});

export default userLoginSlice.reducer;
