import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpOrg } from "../../services/org/signUpOrg";
import cookie from "js-cookie";


export const registerOrg = createAsyncThunk(
  "signUpOrg/registerOrg",
  async ({
    name,
    infoEmail,
    description,
    website,
    phone,
    addressA,
    addressB,
    zipcode,
    logoUrl,
    bannerUrl,
    userId,
  }) => {
    const data = signUpOrg({
      name,
      infoEmail,
      description,
      website,
      phone,
      addressA,
      addressB,
      zipcode,
      logoUrl,
      bannerUrl,
      userId,
    });

    return data;
  }
);

const registerOrgSlice = createSlice({
  name: "signUpOrg",
  initialState: {
    status: null,
    admin: null,
  },

  extraReducers: {
    [registerOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.orgUserStatus = payload;
      cookie.set("orgId", payload.org_id);

    },
    [registerOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default registerOrgSlice.reducer;
