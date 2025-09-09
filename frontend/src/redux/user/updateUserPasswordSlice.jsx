import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserPassword } from "../../services/user/updateUserPassword";

export const changeUserPassword = createAsyncThunk(
  "updateUserPassword/changeUserPassword",
  async ({
    userId,
    currentPassword,
    passwordA,
    passwordB,
  }) => {
    const data = updateUserPassword({
      userId,
      currentPassword,
      passwordA,
      passwordB,
    });
    return data;
  }
);

const changeUserPasswordSlice = createSlice({
  name: "updateUserPassword",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeUserPassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeUserPassword.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
    },
    [changeUserPassword.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeUserPasswordSlice.reducer;
