import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateUrlApi } from "../../services/image/generateUrl";

export const generateUrl = createAsyncThunk("urls/generateUrl", async () => {
  const data = generateUrlApi();
  return data;
});

const generateUrlSlice = createSlice({
  name: "url",
  initialState: {
    status: null,
  },

  extraReducers: {
    [generateUrl.pending]: (state, action) => {
      state.status = "loading";
    },
    [generateUrl.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.url = payload;
    },
    [generateUrl.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default generateUrlSlice.reducer;
