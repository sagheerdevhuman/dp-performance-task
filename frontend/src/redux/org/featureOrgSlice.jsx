import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featureOrg } from "../../services/org/featureOrg";

export const orgFeatureStatus = createAsyncThunk(
  "featureOrg/orgFeatureStatus",
  async ({ org_id }) => {
    const data = featureOrg({ org_id });
    return data;
  }
);

const featureOrgSlice = createSlice({
  name: "featureOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [orgFeatureStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgFeatureStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [orgFeatureStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default featureOrgSlice.reducer;
