import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateVideo } from "../../services/video/updateVideo";

export const changeVideo = createAsyncThunk(
  "updateVideo/changeVideo",
  async ({
    video_id,
    name,
    description,
    link,
    org_id,
    tags,
    image,
  }) => {
    try {
      const data = await updateVideo({
        video_id,
        name,
        description,
        link,
        org_id,
        tags,
        image,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const updateVideoSlice = createSlice({
  name: "updateVideo",
  initialState: {
    status: null,
    editStatus: null,
    error: null,
  },

  reducers: {
    clearUpdateVideoStatus: (state) => {
      state.status = null;
      state.error = null;
    },
    clearUpdateVideoError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [changeVideo.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [changeVideo.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
      state.error = null;
    },
    [changeVideo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearUpdateVideoStatus, clearUpdateVideoError } = updateVideoSlice.actions;
export default updateVideoSlice.reducer;
