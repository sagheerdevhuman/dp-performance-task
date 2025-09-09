import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../../services/user/updateProfile";

export const changeProfile = createAsyncThunk(
  "updateProfile/changeProfile",
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
    const data = updateProfile({
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

const changeProgramSlice = createSlice({
  name: "updateProfile",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeProfile.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.profile = payload;
    },
    [changeProfile.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeProgramSlice.reducer;
