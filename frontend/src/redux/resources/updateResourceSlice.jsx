import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateResource } from "../../services/resources/updateResource";
import setAuthToken from "../../utilities/setAuthToken";

export const changeResource = createAsyncThunk(
  "resource/updateResource",

  async (resourceData, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await updateResource(resourceData);
    return data;
  }
);

const updateResourceSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    updatedResource: null,
  },

  extraReducers: {
    [changeResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.updatedResource = payload;
    },
    [changeResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateResourceSlice.reducer; 