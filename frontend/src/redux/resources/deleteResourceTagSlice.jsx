import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteResourceTag } from "../../services/resources/deleteResourceTag";
import setAuthToken from "../../utilities/setAuthToken";

export const removeTagFromResource = createAsyncThunk(
  "resource/deleteResourceTag",

  async ({ resource_id, tag_id }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await deleteResourceTag({ resource_id, tag_id });
    return data;
  }
);

const deleteResourceTagSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    deletedTag: null,
  },

  extraReducers: {
    [removeTagFromResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeTagFromResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.deletedTag = payload;
    },
    [removeTagFromResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deleteResourceTagSlice.reducer; 