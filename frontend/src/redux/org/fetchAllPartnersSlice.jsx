import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPartners } from "../../services/org/fetchAllPartners";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllPartners = createAsyncThunk(
  "fetchAllPartners/getAllPartners",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllPartners();
    return data;
  }
);

const getAllOrgsSlice = createSlice({
  name: "fetchAllPartners",
  initialState: {
    status: null,
  },

  extraReducers: {
    [getAllPartners.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllPartners.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.partners = payload;
    },
    [getAllPartners.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllPartnersSlice.reducer;
