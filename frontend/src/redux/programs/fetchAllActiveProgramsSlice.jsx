import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllActivePrograms } from "../../services/programs/fetchAllActivePrograms";

export const getAllActivePrograms = createAsyncThunk(
  "program/fetchActivePrograms",

  async () => {  
    const data = fetchAllActivePrograms();
    return data;
  }
);

const getAllActiveProgramsSlice = createSlice({
  name: "program",
  initialState: {
    status: null,
    program: null,
  },

  extraReducers: {
    [getAllActivePrograms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllActivePrograms.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.program = payload;
    },
    [getAllActivePrograms.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllActiveProgramsSlice.reducer;
