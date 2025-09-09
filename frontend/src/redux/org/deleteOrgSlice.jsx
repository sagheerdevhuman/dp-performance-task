import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOrg } from "../../services/org/deleteOrg";

export const removeOrg = createAsyncThunk(
  "deleteOrg/removeOrg",
  async ({ org_id }) => {
    const data = deleteOrg({ org_id });
    return data;
  }
);

const removeOrgSlice = createSlice({
  name: "deleteOrg",
  initialState: {
    status: null,
    conversionStatus: null,
  },

  extraReducers: {
    [removeOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.conversionStatus = payload;
    },
    [removeOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default removeOrgSlice.reducer;
