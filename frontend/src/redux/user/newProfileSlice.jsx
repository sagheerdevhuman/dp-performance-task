import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newProfile } from "../../services/user/newProfile";

export const createProfile = createAsyncThunk(
  "newProfile/createProfile",
  async ({
    user_id,
    past_experience,
    portfolio,
    education_level,
    college_in_stem,
    income_level,
    date_of_birth,
    gender,
    address,
    zipcode,
  }) => {
    const data = newProfile({
      user_id,
      past_experience,
      portfolio,
      education_level,
      college_in_stem,
      income_level,
      date_of_birth,
      gender,
      address,
      zipcode,
    });
    return data;
  }
);

const newProfileSlice = createSlice({
  name: "newProfile",
  initialState: { status: null, profile: null },

  extraReducers: {
    [createProfile.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createProfile.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [createProfile.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newProfileSlice.reducer;
