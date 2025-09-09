import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPrograms } from "../../services/programs/fetchAllPrograms";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllPrograms = createAsyncThunk(
  "fetchAllPrograms/getAllPrograms",
  async ({ user_id }) => {
    const data = fetchAllPrograms({ user_id });
    return data;
  }
);

const getAllProgramsSlice = createSlice({
  name: "fetchAllPrograms",
  initialState: {
    status: null,
    programs: null,
  },

  extraReducers: {
    [getAllPrograms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllPrograms.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programs = payload;
    },
    [getAllPrograms.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});


export default getAllProgramsSlice.reducer;
