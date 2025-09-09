import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newTopic } from "../../services/programs/newTopic";

export const createTopic = createAsyncThunk(
  "newTopic/createTopic",
  async ({
    program_id,
    skills,
    
  }) => {
    const data = newTopic({
      program_id,
      skills,
    });
    return data;
  }
);

const newTopicSlice = createSlice({
  name: "newTopic",
  initialState: { status: null, topic: null },

  extraReducers: {
    [createTopic.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createTopic.fulfilled]: (state, action) => {
      state.status = "success";
      state.topic = action.payload;
    },
    [createTopic.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newTopicSlice.reducer;
