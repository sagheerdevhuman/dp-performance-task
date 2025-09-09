import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllEventsByOrg } from "../../services/events/fetchAllEventsByOrg";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllEventsByOrg = createAsyncThunk(
  "fetchAllEventsByOrg/getAllEventsByOrg",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllEventsByOrg({ org_id });
    return data;
  }
);

const getAllEventsByOrgSlice = createSlice({
  name: "fetchAllEventsByOrg",
  initialState: {
    status: null,
    eventsStatus: null,
  },

  extraReducers: {
    [getAllEventsByOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllEventsByOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.events = payload;
    },
    [getAllEventsByOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});


export default getAllEventsByOrgSlice.reducer;
