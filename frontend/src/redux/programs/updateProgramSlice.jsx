import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProgram } from "../../services/programs/updateProgram";

export const changeProgram = createAsyncThunk(
  "updateProgram/changeProgram",
  async ({
    program_id,
    name,
    description,
    requirements,
    enrollment_deadline,
    start_date,
    end_date,
    start_time,
    end_time,
    week_days,
    location,
    video_call_link,
    is_virtual,
    banner_url,
    user_id,
    org_id,
    
  }) => {
    const data = updateProgram({
      program_id,
      name,
      description,
      requirements,
      enrollment_deadline,
      start_date,
      end_date,
      start_time,
      end_time,
      week_days,
      location,
      video_call_link,
      is_virtual,
      banner_url,
      user_id,
      org_id,
      
    });
    return data;
  }
);

const updateProgramSlice = createSlice({
  name: "updateProgram",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [changeProgram.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeProgram.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [changeProgram.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default updateProgramSlice.reducer;
