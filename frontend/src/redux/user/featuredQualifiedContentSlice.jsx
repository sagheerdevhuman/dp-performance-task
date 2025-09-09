import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featuredQualifiedContent } from "../../services/user/featuredQualifiedContent";
import setAuthToken from "../../utilities/setAuthToken";

export const getFeaturedQualifiedContent = createAsyncThunk(
  "featuredQualifiedContent/getFeaturedQualifiedContent",
  async ({ user_id }) => {
        const data = featuredQualifiedContent({user_id});
    return data;
  }
);

const getFeaturedQualifiedContentSlice = createSlice({
  name: "featuredQualifiedContent",
  initialState: {
    status: null,
    content: null,
    error: null,
  },

  extraReducers: {
    [getFeaturedQualifiedContent.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFeaturedQualifiedContent.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.content = payload;
    },
    [getFeaturedQualifiedContent.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});


export default getFeaturedQualifiedContentSlice.reducer;
