import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpUser } from "../../services/user/signUpUser";

export const registerUser = createAsyncThunk(
  "signUpUser/registerUser",
  async ({ firstName, lastName, email, passwordA, passwordB, profileImage }) => {
    const data = signUpUser({
      profileImage,
      firstName,
      lastName,
      email,
      passwordA,
      passwordB,
    });

    return data;
  }
);

const registerUserSlice = createSlice({
  name: "signUpUser",
  initialState: {
    status: null,
  },

  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default registerUserSlice.reducer;
