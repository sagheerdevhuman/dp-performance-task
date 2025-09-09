import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { qualifiedContent } from "../../services/user/qualifiedContent";
import setAuthToken from "../../utilities/setAuthToken";

export const getQualifiedContent = createAsyncThunk(
  "qualifiedContent/getQualifiedContent",
  async ({ user_id }) => {
        const data = qualifiedContent({user_id});
    return data;
  }
);

const getQualifiedContentSlice = createSlice({
  name: "qualifiedContent",
  initialState: {
    status: null,
    content: null,
    error: null,
  },

  extraReducers: {
    [getQualifiedContent.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQualifiedContent.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.content = payload;
    },
    [getQualifiedContent.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});


export default getQualifiedContentSlice.reducer;
