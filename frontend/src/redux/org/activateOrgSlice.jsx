import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateOrg } from "../../services/org/activateOrg";

export const orgActiveStatus = createAsyncThunk(
  "activateOrg/orgActiveStatus",
  async ({ org_id }) => {
    const data = activateOrg({ org_id });
    return data;
  }
);

const activateOrgSlice = createSlice({
  name: "activateOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [orgActiveStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [orgActiveStatus.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgActiveStatus = payload;
    },
    [orgActiveStatus.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activateOrgSlice.reducer;
