import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchVideoById } from "../../services/video/fetchVideoById";
import setAuthToken from "../../utilities/setAuthToken";

export const getVideoById = createAsyncThunk(
  "fetchVideoById/getVideoById",

  async ({ video_id, userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = await fetchVideoById(video_id);
    return data;
  }
);

const getVideoByIdSlice = createSlice({
  name: "fetchVideoById",
  initialState: {
    status: null,
    videos: null,
  },

  extraReducers: {
    [getVideoById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getVideoById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.videos = payload;
    },
    [getVideoById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getVideoByIdSlice.reducer; 