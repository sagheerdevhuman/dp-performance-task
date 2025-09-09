import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../services/categories/getCategories";
import setAuthToken from "../../utilities/setAuthToken";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState }) => {
    const { userToken } = getState().userLogin || {};
    if (userToken) {
      setAuthToken(userToken);
    }
    const data = await getCategories();
    return data;
  }
);

const getCategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    status: null,
    categories: [],
    error: null,
  },

  reducers: {
    clearCategoriesStatus: (state) => {
      state.status = null;
      state.error = null;
    },
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.categories = payload;
      state.error = null;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearCategoriesStatus, clearCategoriesError } = getCategoriesSlice.actions;
export default getCategoriesSlice.reducer; 