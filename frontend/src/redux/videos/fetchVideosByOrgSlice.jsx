import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchVideosByOrg } from "../../services/video/fetchVideosByOrg";
import setAuthToken from "../../utilities/setAuthToken";

export const getVideosByOrg = createAsyncThunk(
  "fetchVideosByOrg/getVideosByOrg",

  async ({ org_id, userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchVideosByOrg(org_id);
    return data;
  }
);

const getVideosByOrgSlice = createSlice({
  name: "fetchVideosByOrg",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getVideosByOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [getVideosByOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.videosByOrg = payload;
    },
    [getVideosByOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getVideosByOrgSlice.reducer; 