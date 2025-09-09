import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedEvents } from "../../services/events/fetchRecommendedEvents";
import setAuthToken from "../../utilities/setAuthToken";

export const getRecommendedEvents = createAsyncThunk(
  "fetchRecommendedEvents/getRecommendedEvents",
  async ({ user_id }) => {
    const data = fetchRecommendedEvents({ user_id });
    return data;
  }
);

const getRecommendedEventsSlice = createSlice({
  name: "fetchRecommendedEvents",
  initialState: {
    status: null,
    recommendedEvents: null,
    error: null,
  },

  extraReducers: {
    [getRecommendedEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRecommendedEvents.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.recommendedEvents = payload;
    },
    [getRecommendedEvents.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default getRecommendedEventsSlice.reducer; 