import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteResourceCategory } from "../../services/resources/deleteResourceCategory";
import setAuthToken from "../../utilities/setAuthToken";

export const removeCategoryFromResource = createAsyncThunk(
  "resource/deleteResourceCategory",

  async ({ resource_id, category_id }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await deleteResourceCategory({ resource_id, category_id });
    return data;
  }
);

const deleteResourceCategorySlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    deletedCategory: null,
  },

  extraReducers: {
    [removeCategoryFromResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeCategoryFromResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.deletedCategory = payload;
    },
    [removeCategoryFromResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deleteResourceCategorySlice.reducer; 