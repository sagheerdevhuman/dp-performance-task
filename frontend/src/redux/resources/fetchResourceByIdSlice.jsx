import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchResourceById } from "../../services/resources/fetchResourceById";
import setAuthToken from "../../utilities/setAuthToken";

export const getResourceById = createAsyncThunk(
  "resource/fetchResourceById",

  async ({ resource_id, userToken }) => {
    // if (userToken) {
    //   setAuthToken(userToken);
    // }
    const data = await fetchResourceById({ resource_id });
    return data;
  }
);

const getResourceByIdSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    resource: null,
  },

  extraReducers: {
    [getResourceById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getResourceById.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.resource = payload;
    },
    [getResourceById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getResourceByIdSlice.reducer; 