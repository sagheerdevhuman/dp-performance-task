import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newProgram } from "../../services/programs/newProgram";

export const createProgram = createAsyncThunk(
  "newProgram/createProgram",
  async ({
    org_id,
    name,
    description,
    requirements,
    enrollment_deadline,
    start_date,
    end_date,
    start_time,
    end_time,
    week_days,
    video_call_link,
    skills,
    is_virtual,
    bannerUrl,
    location,
    user_id,
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender, 
    experience,
    city,
    zipcode,
    radius,
  }) => {
    const data = newProgram({
      org_id,
      name,
      description,
      requirements,
      enrollment_deadline,
      start_date,
      end_date,
      start_time,
      end_time,
      week_days,
      video_call_link,
      skills,
      is_virtual,
      bannerUrl,
      location,
      user_id,
      past_experience,
      education_level,
      max_income_level,
      min_income,
      max_age,
      min_age,
      gender,
      experience,
      city,
      zipcode,
      radius,
    });
    return data;
  }
);

const newProgramSlice = createSlice({
  name: "newProgram",
  initialState: { status: null, program: null },

  extraReducers: {
    [createProgram.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createProgram.fulfilled]: (state, action) => {
      state.status = "success";
      state.program = action.payload;
    },
    [createProgram.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newProgramSlice.reducer;
