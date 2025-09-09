import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateCategory } from "../../services/categories/updateCategory";
import setAuthToken from "../../utilities/setAuthToken";

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ category_id, name, description, type }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await updateCategory({ category_id, name, description, type });
    return { category_id, data };
  }
);

const updateCategorySlice = createSlice({
  name: "updateCategory",
  initialState: {
    status: null,
    updatedCategory: null,
    error: null,
  },

  reducers: {
    clearUpdateCategoryStatus: (state) => {
      state.status = null;
      state.updatedCategory = null;
      state.error = null;
    },
    clearUpdateCategoryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [editCategory.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [editCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.updatedCategory = payload;
      state.error = null;
    },
    [editCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearUpdateCategoryStatus, clearUpdateCategoryError } = updateCategorySlice.actions;
export default updateCategorySlice.reducer; 