import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetGeneratePasswordBxdp } from "../../services/bxdp/resetGeneratedBxdpPassword";

export const changeGeneratedPasswordBxdp = createAsyncThunk(
  "resetGeneratePasswordBxdp/changeGeneratedPasswordBxdp",
  async ({
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
    const data = resetGeneratePasswordBxdp({
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

const changeGeneratedPasswordBxdpSlice = createSlice({
  name: "resetGeneratePasswordBxdp",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeGeneratedPasswordBxdp.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeGeneratedPasswordBxdp.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeGeneratedPasswordBxdp.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeGeneratedPasswordBxdpSlice.reducer;
