import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateOrg } from "../../services/org/updateOrg";

export const changeOrg = createAsyncThunk(
  "updateOrg/changeOrg",
  async ({
    user_id,
    org_id,
    name,
    info_email,
    description,
    website,
    phone,
    address_a,
    address_b,
    zipcode,
    logo_url,
    banner_url,
  }) => {
    const data = updateOrg({
      user_id,
      org_id,
      name,
      info_email,
      description,
      website,
      phone,
      address_a,
      address_b,
      zipcode,
      logo_url,
      banner_url,
    });
    return data;
  }
);

const changeOrgSlice = createSlice({
  name: "updateOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeOrgSlice.reducer;
