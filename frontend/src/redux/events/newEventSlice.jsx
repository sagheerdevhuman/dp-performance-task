import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newEvent } from "../../services/events/newEvent";

export const createEvent = createAsyncThunk(
  "newEvent/createEvent",
  async ({
    org_id,
    name,
    description,
    location,
    rsvp_link,
    days,
    is_virtual,
    bannerUrl,
    user_id,
    tags,
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
    const data = newEvent({
      org_id,
      description,
      name,
      location,
      rsvp_link,
      days,
      is_virtual,
      bannerUrl,
      user_id,
      tags,
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

const newEventSlice = createSlice({
  name: "newEvent",
  initialState: { status: null, event: null },

  extraReducers: {
    [createEvent.pending]: (state, action) => {
      state.status = "loading...";
    },
    [createEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.event = action.payload;
      console.log("did it")
    },
    [createEvent.rejected]: (state, action) => {
      state.status = "failed";
      console.log("bruh")
    },
  },
});

export default newEventSlice.reducer;
