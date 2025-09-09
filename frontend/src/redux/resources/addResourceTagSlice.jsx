import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addResourceTag } from "../../services/resources/addResourceTag";
import setAuthToken from "../../utilities/setAuthToken";

export const addTagToResource = createAsyncThunk(
  "resource/addResourceTag",

  async ({ resource_id, tag_name }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await addResourceTag({ resource_id, tag_name });
    return data;
  }
);

const addResourceTagSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    addedTag: null,
  },

  extraReducers: {
    [addTagToResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [addTagToResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.addedTag = payload;
    },
    [addTagToResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default addResourceTagSlice.reducer; 