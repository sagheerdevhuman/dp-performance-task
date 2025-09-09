const { Router } = require("express");
const requirementsRouter = Router();
const requirementsControl = require("../controllers/requirements");
const { checkForAccessToken, checkIfAdmin } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");

/*-------------------REQUIREMENTS-ROUTES-------------------*/

requirementsRouter.use(corsHeader);

// Get all requirements
requirementsRouter.get("/requirements", requirementsControl.getAllRequirements);

// Get requirements by ID
requirementsRouter.get("/requirements/:requirements_id", requirementsControl.getRequirementsById);

// Get requirements by program ID
requirementsRouter.get("/requirements/programs/:program_id", requirementsControl.getRequirementsByProgramId);

// Get requirements by event ID
requirementsRouter.get("/requirements/events/:event_id", requirementsControl.getRequirementsByEventId);

// Update requirements by ID
requirementsRouter.put("/requirements/:requirements_id", requirementsControl.updateRequirements);

// Update requirements by program ID
requirementsRouter.put("/requirements/programs/:program_id", requirementsControl.updateRequirementsByProgramId);

// Update requirements by event ID
requirementsRouter.put("/requirements/events/:event_id", requirementsControl.updateRequirementsByEventId);

// Delete requirements by ID
requirementsRouter.delete("/requirements/:requirements_id", requirementsControl.deleteRequirements);

module.exports = requirementsRouter; 