import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllVideos } from "../../services/video/fetchAllVideos";
import setAuthToken from "../../utilities/setAuthToken";

export const getVideoList = createAsyncThunk(
  "fetchAllVideos/getVideoList",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllVideos();
    return data;
  }
);

const getVideoListSlice = createSlice({
  name: "fetchAllVideos",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getVideoList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getVideoList.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.userList = payload;
    },
    [getVideoList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getVideoListSlice.reducer;
