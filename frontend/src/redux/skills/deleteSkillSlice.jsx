import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteSkill } from "../../services/skills/deleteSkill";

export const removeSkill = createAsyncThunk(
  "deleteSkill/removeSkill",
  async ({ skill_id }) => {
    const data = deleteSkill({ skill_id });
    return data;
  }
);

const removeSkillSlice = createSlice({
  name: "deleteSkill",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeSkill.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeSkill.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeSkill.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeSkillSlice.reducer;
