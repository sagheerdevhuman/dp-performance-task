import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { qualifiedPrograms } from "../../services/programs/qualifiedPrograms";
import setAuthToken from "../../utilities/setAuthToken";

export const getQualifiedPrograms = createAsyncThunk(
  "qualifiedPrograms/getQualifiedPrograms",
  async ({ user_id }) => {
        const data = qualifiedPrograms({user_id});
    return data;
  }
);

const getQualifiedProgramsSlice = createSlice({
  name: "qualifiedPrograms",
  initialState: {
    status: null,
    programs: null,
    error: null,
  },

  extraReducers: {
    [getQualifiedPrograms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQualifiedPrograms.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programs = payload;
    },
    [getQualifiedPrograms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});


export default getQualifiedProgramsSlice.reducer;
