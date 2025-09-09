import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveProgram } from "../../services/programs/approveProgram";

export const programApprovalStatus = createAsyncThunk(
  "approveProgram/program/ApprovalStatus",

  async ({ program_id }) => {
    console.log(program_id)
    const data = approveProgram({ program_id});
    return data;
  }
);

const programApprovalStatusSlice = createSlice({
  name: "approveProgram",
  initialState: {
    status: null,
    programStatus: null,
  },

  extraReduscers: {
    [programApprovalStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [programApprovalStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programStatus = payload;
    },
    [programApprovalStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default programApprovalStatusSlice.reducer;
