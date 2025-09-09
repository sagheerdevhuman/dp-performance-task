import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../services/user/updateUser";
import cookie from "js-cookie";

export const changeUser = createAsyncThunk(
  "updateUser/changeUser",
  async ({
    userId,
    firstName,
    lastName,
    email,
    profileUrl,
  }) => {
    const data = updateUser({   
      userId,
      firstName,
      lastName,
      email,
      profileUrl,
    });
    return data;
  }
);

const changeUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.user = payload;
      console.log("payload: ", payload)
      cookie.set("firstName", payload.user.first_name);
      cookie.set("lastName", payload.user.last_name);
      cookie.set("email", payload.user.user_email); 
      cookie.set("userName", `${payload.user.first_name} ${payload.user.last_name}`);   
      cookie.set("profileImage", payload.user.profile_img);
    },
    [changeUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default changeUserSlice.reducer;
