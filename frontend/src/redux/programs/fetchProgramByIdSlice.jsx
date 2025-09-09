import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProgramById } from "../../services/programs/fetchProgramById";

export const getProgramById = createAsyncThunk(
  "program/fetchProgram",

  async ({ program_id }) => {
    const data = fetchProgramById({ program_id });
    return data;
  }
);

const getProgramByIdSlice = createSlice({
  name: "program",
  initialState: {
    status: null,
    
  },

  extraReducers: {
    [getProgramById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProgramById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programs = payload;
    },
    [getProgramById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getProgramByIdSlice.reducer;
