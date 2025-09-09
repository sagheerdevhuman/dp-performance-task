import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPartnersList } from "../../services/user/fetchPartnersList";
import setAuthToken from "../../utilities/setAuthToken";

export const getPartnersList = createAsyncThunk(
  "fetchPartnersList/getPartnersList",

  async () => {
    const data = fetchPartnersList();
    return data;
  }
);

const getPartnersListSlice = createSlice({
  name: "fetchPartnersList",
  initialState: {
    status: null,
    partnersList: null,
  },

  extraReducers: {
    [getPartnersList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPartnersList.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.partnersList = payload;
    },
    [getPartnersList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getPartnersListSlice.reducer;
