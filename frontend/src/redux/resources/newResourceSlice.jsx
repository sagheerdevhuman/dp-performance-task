import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newResource } from "../../services/resources/newResource";
import setAuthToken from "../../utilities/setAuthToken";

export const createResource = createAsyncThunk(
  "resource/newResource",

  async ({
    user_id,
    org_id,
    title,
    description,
    location,
    link,
    tags,
    categories,
    provider,
    photo,  
    is_platform_wide,
    is_active, 
  }) => {
    // const { userToken } = getState().userLogin || {};
    // if (userToken) {
    //   setAuthToken(userToken);
    // }
    const data = await newResource({
      user_id,
      org_id,
      title,
      description,
      location,
      link,
      tags,
      photo,
      categories,
      provider,
      is_platform_wide,
      is_active,
    });
    return data;
  }
);

const newResourceSlice = createSlice({
  name: "resource",
  initialState: {
    status: null,
    newResource: null,
  },

  extraReducers: {
    [createResource.pending]: (state, action) => {
      state.status = "loading";
    },
    [createResource.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.newResource = payload;
    },
    [createResource.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newResourceSlice.reducer; 