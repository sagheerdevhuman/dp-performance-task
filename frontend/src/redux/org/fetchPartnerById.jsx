import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPartnerById } from "../../services/org/fetchPartnerById";

export const getPartnerById = createAsyncThunk(
  "fetchPartnerById/getPartnerById",
  async ({ org_id }) => {
    const data = fetchPartnerById({ org_id });
    return data;
  }
);

const getPartnerByIdSlice = createSlice({
  name: "fetchOrg",
  initialState: { status: null },

  extraReducers: {
    [getPartnerById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPartnerById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.org = payload;
    },
    [getPartnerById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getPartnerByIdSlice.reducer;
