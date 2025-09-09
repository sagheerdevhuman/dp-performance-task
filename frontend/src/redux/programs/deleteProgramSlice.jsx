import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProgram } from "../../services/programs/deleteProgram";

export const removeProgram = createAsyncThunk(
  "deleteProgram/removeProgram",
  async ({ program_id }) => {
    const data = deleteProgram({ program_id });
    return data;
  }
);

const removeProgramSlice = createSlice({
  name: "deleteProgram",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeProgram.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeProgram.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeProgram.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeProgramSlice.reducer;
