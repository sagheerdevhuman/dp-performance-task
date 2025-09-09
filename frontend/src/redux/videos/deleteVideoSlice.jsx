import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteVideo } from "../../services/video/deleteVideo";

export const removeVideo = createAsyncThunk(
  "deleteVideo/removeVideo",
  async ({ video_id }) => {
    const data = deleteVideo({ video_id });
    return data;
  }
);

const removeVideoSlice = createSlice({
  name: "deleteVideo",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeVideo.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeVideo.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeVideo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeVideoSlice.reducer;
