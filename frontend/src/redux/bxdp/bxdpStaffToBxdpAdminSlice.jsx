import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userToBxdpAdmin } from "../../services/bxdp/bxdpStaffToBxdpAdmin";
import setAuthToken from "../../utilities/setAuthToken";

export const changeUserToBxdpAdmin = createAsyncThunk(
  "userToBxdpAdmin/changeUserToBxdpAdmin",
  async ({ userToken, user_id }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = userToBxdpAdmin({
      user_id,
    });
    return data;
  }
);

const userToBxdpAdminSlice = createSlice({
  name: "userToBxdpAdmin",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [changeUserToBxdpAdmin.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeUserToBxdpAdmin.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [changeUserToBxdpAdmin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userToBxdpAdminSlice.reducer;
