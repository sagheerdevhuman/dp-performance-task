import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rejectProgram } from "../../services/programs/rejectProgram";

export const programRejectionStatus = createAsyncThunk(
  "rejectProgram/program/RejectionStatus",

  async ({ program_id, user_id, reason }) => {
    const data = rejectProgram({ program_id, user_id, reason});
    return data;
  }
);

const programRejectionStatusSlice = createSlice({
  name: "rejectProgram",
  initialState: {
    status: null,
    programStatus: null,
  },

  extraReduscers: {
    [programRejectionStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [programRejectionStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programStatus = payload;
    },
    [programRejectionStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default programRejectionStatusSlice.reducer;
