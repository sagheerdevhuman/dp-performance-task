import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedPrograms } from "../../services/programs/fetchRecommendedPrograms";
import setAuthToken from "../../utilities/setAuthToken";

export const getRecommendedPrograms = createAsyncThunk(
  "fetchRecommendedPrograms/getRecommendedPrograms",
  async ({ user_id }) => {
    const data = fetchRecommendedPrograms({ user_id });
    return data;
  }
);

const getRecommendedProgramsSlice = createSlice({
  name: "fetchRecommendedPrograms",
  initialState: {
    status: null,
    recommendedPrograms: null,
    error: null,
  },

  extraReducers: {
    [getRecommendedPrograms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRecommendedPrograms.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.recommendedPrograms = payload;
    },
    [getRecommendedPrograms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default getRecommendedProgramsSlice.reducer; 