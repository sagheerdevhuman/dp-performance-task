import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newSkill } from "../../services/skills/newSkill";

export const createSkill = createAsyncThunk(
  "newSkill/createSkill",
  async ({ name, description }) => {
    const data = newSkill({
      name,
      description,
    });
    return data;
  }
);

const newSkillSlice = createSlice({
  name: "newSkill",
  initialState: { skill: null, status: null },

  extraReducers: {
    [createSkill.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createSkill.fulfilled]: (state, action) => {
      state.status = "success";
      state.skill = action.payload;
    },
    [createSkill.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newSkillSlice.reducer;
