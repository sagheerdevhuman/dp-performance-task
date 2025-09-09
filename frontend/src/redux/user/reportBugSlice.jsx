import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reportBug } from "../../services/user/reportBug";

export const createReport = createAsyncThunk(
  "reportBug/",
  async ({
    user_id,
    subject,
    description
  }) => {
    const data = reportBug({
      user_id,
      subject,
      description
    });

    return data;
  }
);

const newReportSlice = createSlice({
  name: "reportBug",
  initialState: {
    status: null,
    editStatus: null,
  },

  extraReducers: {
    [createReport.pending]: (state, action) => {
      state.status = "loading";
    },
    [createReport.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.editStatus = payload;
    },
    [createReport.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default newReportSlice.reducer;
