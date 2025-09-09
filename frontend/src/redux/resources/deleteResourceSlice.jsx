import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteResource } from "../../services/resources/deleteResource";
import setAuthToken from "../../utilities/setAuthToken";

export const removeResource = createAsyncThunk(
  "resource/deleteResource",

  async ({ resource_id }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await deleteResource({ resource_id });
    return data;
  }
);

const deleteResourceSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    deletedResource: null,
  },

  extraReducers: {
    [removeResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.deletedResource = payload;
    },
    [removeResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deleteResourceSlice.reducer; 