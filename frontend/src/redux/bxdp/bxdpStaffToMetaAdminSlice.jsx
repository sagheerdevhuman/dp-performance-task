import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userToMetaAdmin } from "../../services/bxdp/bxdpStaffToMetaAdmin";
import setAuthToken from "../../utilities/setAuthToken";

export const changeUserToMetaAdmin = createAsyncThunk(
  "userToMetaAdmin/changeUserToMetaAdmin",
  async ({ userToken, user_id }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = userToMetaAdmin({
      user_id,
    });
    return data;
  }
);

const userToMetaAdminSlice = createSlice({
  name: "userToMetaAdmin",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeUserToMetaAdmin.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeUserToMetaAdmin.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeUserToMetaAdmin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userToMetaAdminSlice.reducer;
