import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategory } from "../../services/categories/addCategory";
import setAuthToken from "../../utilities/setAuthToken";

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ name }, { getState }) => {
    const { userToken } = getState().userLogin || {};
    // if (userToken) {
    //   setAuthToken(userToken);
    // }
    const data = await addCategory({ name });
    return data;
  }
);

const addCategorySlice = createSlice({
  name: "addCategory",
  initialState: {
    status: null,
    addedCategory: null,
    error: null,
  },

  reducers: {
    clearAddCategoryStatus: (state) => {
      state.status = null;
      state.addedCategory = null;
      state.error = null;
    },
    clearAddCategoryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    [createCategory.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.addedCategory = payload;
      state.error = null;
    },
    [createCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearAddCategoryStatus, clearAddCategoryError } = addCategorySlice.actions;
export default addCategorySlice.reducer; 