import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { qualifiedEvents } from "../../services/events/qualifiedEvents";
import setAuthToken from "../../utilities/setAuthToken";

export const getQualifiedEvents = createAsyncThunk(
  "qualifiedEvents/getQualifiedEvents",
  async ({ user_id }) => {
        const data = qualifiedEvents({user_id});
    return data;
  }
);

const getQualifiedEventsSlice = createSlice({
  name: "qualifiedEvents",
  initialState: {
    status: null,
    events: null,
  },

  extraReducers: {
    [getQualifiedEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQualifiedEvents.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.events = payload;
    },
    [getQualifiedEvents.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});


export default getQualifiedEventsSlice.reducer;
