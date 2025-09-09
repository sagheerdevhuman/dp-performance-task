import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetGeneratePasswordOrg } from "../../services/org/resetGeneratedOrgPassword";

export const changeGeneratedPasswordOrg = createAsyncThunk(
  "resetGeneratePasswordOrg/changeGeneratedPasswordOrg",
  async ({
    org_id,
    user_id,
    passwordA,
    passwordB,
    mou,
    isMetaAdmin,
    isBxdpAdmin,
    isOrgAdmin,
    isOrgManager,
    isOrgUser,
  }) => {
    const data = resetGeneratePasswordOrg({
      org_id,
      user_id,
      passwordA,
      passwordB,
      mou,
      isMetaAdmin,
      isBxdpAdmin,
      isOrgAdmin,
      isOrgManager,
      isOrgUser,
    });

    return data;
  }
);

const changeGeneratedPasswordOrgSlice = createSlice({
  name: "resetGeneratePasswordOrg",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeGeneratedPasswordOrg.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeGeneratedPasswordOrg.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeGeneratedPasswordOrg.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeGeneratedPasswordOrgSlice.reducer;
