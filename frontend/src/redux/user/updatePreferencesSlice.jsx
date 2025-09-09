import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updatePreferences } from "../../services/user/updatePreferences";

export const changePreferences = createAsyncThunk(
  "updatePreferences/changePreferences",
  async ({
    user_id,
    availability,
    learning_style,
    preferred_language,
    desired_skills,
    desired_tags,
  }) => {
    const data = updatePreferences({
      user_id,
      availability,
      learning_style,
      preferred_language,
      desired_skills,
      desired_tags,
    });
    return data;
  }
);

const updatePreferencesSlice = createSlice({
  name: "updatePreferences",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changePreferences.pending]: (state, action) => {
      state.status = "loading";
    },
    [changePreferences.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.profile = payload;
    },
    [changePreferences.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updatePreferencesSlice.reducer;
