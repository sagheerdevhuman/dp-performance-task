import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllActiveProgramsByOrg } from "../../services/programs/fetchAllActiveProgramsByOrg";

export const getAllActiveProgramsByOrg = createAsyncThunk(
  "fetchAllActiveProgramsByOrg/getAllActiveProgramsByOrg",

  async ({ org_id }) => {
    const data = fetchAllActiveProgramsByOrg({ org_id });
    return data;
  }
);

const getAllActiveProgramsByOrgSlice = createSlice({
  name: "programs",
  initialState: {
    status: null,
    programs: null,
  },

  extraReducers: {
    [getAllActiveProgramsByOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllActiveProgramsByOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.programs = payload;
      console.log("payload",payload)
     
    
    },
    [getAllActiveProgramsByOrg.rejected]: (state, action) => {
      state.status = "failed";

    },
  },
});

export default getAllActiveProgramsByOrgSlice.reducer;
