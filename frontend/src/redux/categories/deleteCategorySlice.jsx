import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCategory } from "../../services/categories/deleteCategory";
import setAuthToken from "../../utilities/setAuthToken";

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async ({ category_id }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await deleteCategory({ category_id });
    return { category_id, data };
  }
);

const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState: {
    status: null,
    deletedCategoryId: null,
    error: null,
  },

  reducers: {
    clearDeleteCategoryStatus: (state) => {
      state.status = null;
      state.deletedCategoryId = null;
      state.error = null;
    },
    clearDeleteCategoryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [removeCategory.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [removeCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.deletedCategoryId = payload.category_id;
      state.error = null;
    },
    [removeCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearDeleteCategoryStatus, clearDeleteCategoryError } = deleteCategorySlice.actions;
export default deleteCategorySlice.reducer; 