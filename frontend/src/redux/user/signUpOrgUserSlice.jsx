import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpOrgUser } from "../../services/user/signUpOrgUser";

export const registerOrgUser = createAsyncThunk(
  "signUpOrgUser/registerOrgUser",
  async ({ firstName, lastName, email, passwordA, passwordB, }) => {
    const data = signUpOrgUser({
      firstName,
      lastName,
      email,
      passwordA,
      passwordB,
      // profileImg,
    });

    return data;
  }
);

const registerOrgUserSlice = createSlice({
  name: "signUpOrgUser",
  initialState: {
    status: null,
  },

  extraReducers: {
    [registerOrgUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerOrgUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
    },
    [registerOrgUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default registerOrgUserSlice.reducer;
