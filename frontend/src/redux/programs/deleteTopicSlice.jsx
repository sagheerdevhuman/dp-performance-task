import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTopic } from "../../services/programs/deleteTopic";

export const removeTopic = createAsyncThunk(
  "deleteTopic/removeTopic",
  async ({ program_id, skill_id }) => {
    const data = deleteTopic({ program_id, skill_id });
    return data;
  }
);

const removeTopicSlice = createSlice({
  name: "deleteTopic",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeTopic.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeTopic.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeTopic.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeTopicSlice.reducer;
