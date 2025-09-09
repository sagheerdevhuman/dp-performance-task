import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apply } from "../../services/programs/apply";

export const newApplicant = createAsyncThunk(
  "apply/newApplicant",
  async ({
    user_id,
    program_id,
  }) => {
    const data = apply({
      user_id,
      program_id,
    });
    return data;
  }
);

const applySlice = createSlice({
  name: "apply",
  initialState: { status: null, application: null },

  extraReducers: {
    [newApplicant.pending]: (state, action) => {
      state.status = "loading...";
    },
    [newApplicant.fulfilled]: (state, action) => {
      state.status = "success";
      state.application = action.payload;
    },
    [newApplicant.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default applySlice.reducer;
