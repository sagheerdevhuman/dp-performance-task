import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProgramsByOrg } from "../../services/programs/fetchAllProgramsByOrg";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllProgramsByOrg = createAsyncThunk(
  "fetchAllProgramsByOrg/getAllProgramsByOrg",
  async ({ org_id }) => {
    const data = fetchAllProgramsByOrg({ org_id });
    return data;
  }
);

const getAllProgramsByOrgSlice = createSlice({
  name: "fetchAllProgramsByOrg",
  initialState: {
    status: null,
    programs: null,
  },

  extraReducers: {
    [getAllProgramsByOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllProgramsByOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programs = payload;
    },
    [getAllProgramsByOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});


export default getAllProgramsByOrgSlice.reducer;
