import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBxdpStaff } from "../../services/bxdp/fetchAllBXDPStaff";
import setAuthToken from "../../utilities/setAuthToken";

export const getAllBxdpStaff = createAsyncThunk(
  "bxdp/fetchStaff",

  async ({ userToken }) => {
    if (userToken) {
      setAuthToken(userToken);
    }

    const data = fetchAllBxdpStaff();
    return data;
  }
);

const getAllBxdpSlice = createSlice({
  name: "bxdp",
  initialState: {
    status: null,
    staff: null,
  },

  extraReducers: {
    [getAllBxdpStaff.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllBxdpStaff.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.staff = payload;
    },
    [getAllBxdpStaff.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getAllBxdpSlice.reducer;
