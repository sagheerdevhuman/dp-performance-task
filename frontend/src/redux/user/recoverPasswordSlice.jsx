import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recoverPassword } from "../../services/user/recoverPassword";

export const getLink = createAsyncThunk(
  "recoverPassword/getlink",
  async ({
    email
  }) => {
    console.log(email)
    const data = recoverPassword({
      email,
    });

    return data;
  }
);

const recoverPasswordSlice = createSlice({
  name: "getlink",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [getLink.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLink.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [getLink.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default recoverPasswordSlice.reducer;
