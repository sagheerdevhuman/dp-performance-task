import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateSkill } from "../../services/skills/updateSkill";

export const changeSkill = createAsyncThunk(
  "updateSkill/changeSkill",
  async ({
    skill_id,
    name,
    icon_url,
    description,
    user_id
    
  }) => {
    const data = updateSkill({
      skill_id,
      name,
      icon_url,
      description,
      user_id
    });
    return data;
  }
);

const updateSkillSlice = createSlice({
  name: "updateSkill",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeSkill.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeSkill.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeSkill.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateSkillSlice.reducer;
