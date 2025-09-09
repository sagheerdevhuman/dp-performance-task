import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../services/user/fetchAllUsers";
import setAuthToken from "../../utilities/setAuthToken";

export const getUserList = createAsyncThunk(
  "fetchAllUsers/getUserList",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllUsers();
    return data;
  }
);

const getUserListSlice = createSlice({
  name: "fetchAllUsers",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getUserList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserList.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.userList = payload;
    },
    [getUserList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getUserListSlice.reducer;
