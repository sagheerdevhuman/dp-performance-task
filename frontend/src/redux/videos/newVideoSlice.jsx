import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newVideo } from "../../services/video/newVideo";

export const createVideo= createAsyncThunk(
  "newVideo/createVideo",
  async ({ name, link ,org_id, description, tags, image }) => {
    const data = newVideo({
      name,
      link,
      org_id,
      description,
      tags,
      image,
    });
    console.log(data)
    return data;
  }
);

const newVideoSlice = createSlice({
  name: "newVideo",
  initialState: { video: null, status: null },

  extraReducers: {
    [createVideo.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createVideo.fulfilled]: (state, action) => {
      state.status = "success";
      state.video = action.payload;
    },
    [createVideo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newVideoSlice.reducer;
