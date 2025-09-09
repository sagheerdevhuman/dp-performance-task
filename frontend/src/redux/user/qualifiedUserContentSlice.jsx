import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { qualifiedUserContent } from "../../services/user/qualifiedUserContent";
import setAuthToken from "../../utilities/setAuthToken";

export const getQualifiedUserContent = createAsyncThunk(
  "qualifiedContent/getQualifiedUserContent",
  async ({ user_id }) => {
        const data = qualifiedUserContent({user_id});
    return data;
  }
);

const getQualifiedUserContentSlice = createSlice({
  name: "qualifiedUserContent",
  initialState: {
    status: null,
    content: null,
    error: null,
  },

  extraReducers: {
    [getQualifiedUserContent.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQualifiedUserContent.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.content = payload;
    },
    [getQualifiedUserContent.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});


export default getQualifiedUserContentSlice.reducer;
