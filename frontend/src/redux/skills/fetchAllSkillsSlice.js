import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllSkills } from "../../services/skills/fetchAllSkills";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllSkills = createAsyncThunk(
  "fetchAllSkills/getAllSkills",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllSkills();
    return data;
  }
);

const getAllSkillsSlice = createSlice({
  name: "fetchAllSkills",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getAllSkills.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllSkills.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.skills = payload;
    },
    [getAllSkills.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllSkillsSlice.reducer;
