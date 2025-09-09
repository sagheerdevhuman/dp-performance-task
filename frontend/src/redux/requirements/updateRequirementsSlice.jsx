import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  updateProgramRequirements, 
  updateEventRequirements, 
  updateResourceRequirements, 
  updateRequirements 
} from "../../services/requirements/updateRequirements";

// Async thunks for updating requirements
export const changeProgramRequirements = createAsyncThunk(
  "updateRequirements/changeProgramRequirements",
  async ({ program_id, requirements, user_id }) => {
    const data = await updateProgramRequirements({
      program_id,
      requirements,
      user_id,
    });
    return data;
  }
);

export const changeEventRequirements = createAsyncThunk(
  "updateRequirements/changeEventRequirements",
  async ({ event_id, requirements, user_id }) => {
    const data = await updateEventRequirements({
      event_id,
      requirements,
      user_id,
    });
    return data;
  }
);

export const changeResourceRequirements = createAsyncThunk(
  "updateRequirements/changeResourceRequirements",
  async ({ resource_id, requirements, user_id }) => {
    const data = await updateResourceRequirements({
      resource_id,
      requirements,
      user_id,
    });
    return data;
  }
);

export const changeRequirements = createAsyncThunk(
  "updateRequirements/changeRequirements",
  async ({ entity_type, entity_id, requirements, user_id }) => {
    const data = await updateRequirements({
      entity_type,
      entity_id,
      requirements,
      user_id,
    });
    return data;
  }
);

const updateRequirementsSlice = createSlice({
  name: "updateRequirements",
  initialState: {
    status: null,
    error: null,
    programRequirementsStatus: null,
    eventRequirementsStatus: null,
    resourceRequirementsStatus: null,
  },

  reducers: {
    clearRequirementsStatus: (state) => {
      state.status = null;
      state.error = null;
      state.programRequirementsStatus = null;
      state.eventRequirementsStatus = null;
      state.resourceRequirementsStatus = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: {
    // Program Requirements
    [changeProgramRequirements.pending]: (state, action) => {
      state.programRequirementsStatus = "loading";
    },
    [changeProgramRequirements.fulfilled]: (state, { payload }) => {
      state.programRequirementsStatus = "success";
    },
    [changeProgramRequirements.rejected]: (state, action) => {
      state.programRequirementsStatus = "failed";
      state.error = action.error.message;
    },

    // Event Requirements
    [changeEventRequirements.pending]: (state, action) => {
      state.eventRequirementsStatus = "loading";
    },
    [changeEventRequirements.fulfilled]: (state, { payload }) => {
      state.eventRequirementsStatus = "success";
    },
    [changeEventRequirements.rejected]: (state, action) => {
      state.eventRequirementsStatus = "failed";
      state.error = action.error.message;
    },

    // Resource Requirements
    [changeResourceRequirements.pending]: (state, action) => {
      state.resourceRequirementsStatus = "loading";
    },
    [changeResourceRequirements.fulfilled]: (state, { payload }) => {
      state.resourceRequirementsStatus = "success";
    },
    [changeResourceRequirements.rejected]: (state, action) => {
      state.resourceRequirementsStatus = "failed";
      state.error = action.error.message;
    },

    // Generic Requirements
    [changeRequirements.pending]: (state, action) => {
      state.status = "loading";
    },
    [changeRequirements.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [changeRequirements.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { clearRequirementsStatus, clearError } = updateRequirementsSlice.actions;
export default updateRequirementsSlice.reducer; 