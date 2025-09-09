import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateEvent } from "../../services/events/updateEvent";

export const changeEvent = createAsyncThunk(
  "updateEvent/changeEvent",
  async ({
    event_id,
    name,
    days,
    description,
    location,
    rsvp_link,
    is_virtual,
    banner_url,
    user_id,
    org_id
    
  }) => {
    const data = updateEvent({
      event_id,
      name,
      days,
      description,
      location,
      rsvp_link,
      is_virtual,
      banner_url,
      user_id,
      org_id
    });
    return data;
  }
);

const updateEventSlice = createSlice({
  name: "updateEvent",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeEvent.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeEvent.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeEvent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateEventSlice.reducer;
