import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../../services/user/resetPassword";

export const changePassword = createAsyncThunk(
  "resetGeneratePasswordBxdp/changeGeneratedPasswordBxdp",
  async ({
    email,
    reset_password_token,
    passwordA,
    passwordB,
  }) => {
    const data = resetPassword({
      email,
      reset_password_token,
      passwordA,
      passwordB,
    });

    return data;
  }
);

const changePasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changePassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changePassword.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changePasswordSlice.reducer;
