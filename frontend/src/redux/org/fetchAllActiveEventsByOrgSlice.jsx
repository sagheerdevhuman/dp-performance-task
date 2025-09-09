import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllActiveEventsByOrg } from "../../services/org/fetchAllActiveEventsByOrg";

export const getAllActiveEventsByOrg = createAsyncThunk(
  "event/fetchActiveEvents",

  async ({ org_id }) => {
    const data = fetchAllActiveEventsByOrg({ org_id });
    return data;
  }
);

const getAllActiveEventsByOrgSlice = createSlice({
  name: "events",
  initialState: {
    status: null,
    events: null,
  },

  extraReducers: {
    [getAllActiveEventsByOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllActiveEventsByOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.events = payload;
    },
    [getAllActiveEventsByOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllActiveEventsByOrgSlice.reducer;
