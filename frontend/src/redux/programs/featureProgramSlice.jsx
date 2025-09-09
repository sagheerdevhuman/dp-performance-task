import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featureProgram } from "../../services/programs/featureProgram";

export const programFeatureStatus = createAsyncThunk(
  "featureProgram/programFeatureStatus",

  async ({ program_id }) => {
    console.log(program_id)
    const data = featureProgram({ program_id});
    return data;
  }
);

const featureProgramSlice = createSlice({
  name: "featureProgram",
  initialState: {
    status: null,
    programStatus: null,
  },

  extraReduscers: {
    [programFeatureStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [programFeatureStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programStatus = payload;
    },
    [programFeatureStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default featureProgramSlice.reducer;
