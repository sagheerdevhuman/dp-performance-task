import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../services/user/fetchUserProfile";

export const getUserProfile = createAsyncThunk(
  "fetchUserProfile/getUserProfile",
  async ({ user_id }) => {
    const data = fetchUserProfile({ user_id });
    return data;
  }
);

const getUserProfileSlice = createSlice({
  name: "fetchUserProfile",
  initialState: {
    status: null,
    profile: null,
    error: null,
  },

  extraReducers: {
    [getUserProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.profile = payload;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default getUserProfileSlice.reducer; 