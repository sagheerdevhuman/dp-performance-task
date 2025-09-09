import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fileUploader } from "../../services/image/fileUploader";

export const uploadFile = createAsyncThunk(
  "fileUploader/uploadFile",
  async ({
    file,
  }) => {
    const data = fileUploader({
      file
    });
    return data;
  }
);

const fileUploadSlice = createSlice({
  name: "fileUploader",
  initialState: { status: null, event: null },

  extraReducers: {
    [uploadFile.pending]: (state, action) => {
      state.status = "loading...";
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.status = "success";
      state.url = action.payload;
    },
    [uploadFile.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default fileUploadSlice.reducer;
