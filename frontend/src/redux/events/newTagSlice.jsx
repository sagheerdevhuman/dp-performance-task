import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newTag } from "../../services/events/newTag";

export const createTag= createAsyncThunk(
  "newTag/createTag",
  async ({ name, description }) => {
    const data = newTag({
      name,
    });
    return data;
  }
);

const newTagSlice = createSlice({
  name: "newTag",
  initialState: { tag: null, status: null },

  extraReducers: {
    [createTag.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createTag.fulfilled]: (state, action) => {
      state.status = "success";
      state.tag = action.payload;
    },
    [createTag.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newTagSlice.reducer;
