import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addResourceCategory } from "../../services/resources/addResourceCategory";
import setAuthToken from "../../utilities/setAuthToken";

export const addCategoryToResource = createAsyncThunk(
  "resource/addResourceCategory",

  async ({ resource_id, category_name }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await addResourceCategory({ resource_id, category_name });
    return data;
  }
);

const addResourceCategorySlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    addedCategory: null,
  },

  extraReducers: {
    [addCategoryToResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [addCategoryToResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.addedCategory = payload;
    },
    [addCategoryToResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default addResourceCategorySlice.reducer; 