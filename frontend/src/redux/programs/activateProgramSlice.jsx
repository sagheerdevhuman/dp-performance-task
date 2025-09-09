import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateProgram } from "../../services/programs/activateProgram";

export const programActiveStatus = createAsyncThunk(
  "activateProgram/programActiveStatus",

  async ({ program_id }) => {
    console.log(program_id)
    const data = activateProgram({ program_id});
    return data;
  }
);

const activateProgramSlice = createSlice({
  name: "activateProgram",
  initialState: {
    status: null,
    programStatus: null,
  },

  extraReduscers: {
    [programActiveStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [programActiveStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programStatus = payload;
    },
    [programActiveStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activateProgramSlice.reducer;
