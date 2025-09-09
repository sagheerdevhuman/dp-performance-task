import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { qualifiedOrgs } from "../../services/org/qualifiedOrgs";
import setAuthToken from "../../utilities/setAuthToken";

export const getQualifiedOrgs = createAsyncThunk(
  "qualifiedOrgs/getQualifiedOrgs",
  async ({ user_id }) => {
        const data = qualifiedOrgs({user_id});
    return data;
  }
);

const getQualifiedOrgsSlice = createSlice({
  name: "qualifiedOrgs",
  initialState: {
    status: null,
    orgs: null,
    error: null,
  },

  extraReducers: {
    [getQualifiedOrgs.pending]: (state, action) => {
      state.status = "loading";
    },
    [getQualifiedOrgs.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgs = payload;
    },
    [getQualifiedOrgs.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});


export default getQualifiedOrgsSlice.reducer;
