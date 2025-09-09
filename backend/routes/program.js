const { Router } = require("express");
const programRouter = Router();
const programControl = require("../controllers/program");
const { checkForAccessToken, checkIfAdmin } = require("../helpers/validation");

const corsHeader = require("../config/corsHeader");

/*-------------------ORGANIZATION-ROUTES-------------------*/

programRouter.use(corsHeader);

programRouter.post("/programs/:org_id/addProgram", programControl.addProgram);

programRouter.post("/programs/:program_id/addtopic", programControl.addTopic);

programRouter.get("/programs/active", programControl.getAllActivePrograms);

programRouter.get("/all-programs/:user_id", programControl.getAllPrograms);

programRouter.get(
  "/programs/:org_id/active",
  programControl.getAllActiveProgramsByOrg
);

programRouter.get("/program/:program_id", programControl.getProgrambyId);

programRouter.put("/programs/:program_id", programControl.updateProgram);

programRouter.put("/programs/topic/:topic_id", programControl.updateTopic);

programRouter.post("/programs/by_skill", programControl.getProgramsbySkill)

programRouter.delete(
  "/program/:program_id/deleteTopic",
  programControl.deleteTopic
);

programRouter.delete("/programs/:program_id/delete", programControl.deleteProgram);

programRouter.post("/programs/:program_id/apply", programControl.apply);

programRouter.get(
  "/programs/:program_id/applicants",
  programControl.getAllApplicants
);

programRouter.get("/programs/:org_id/org", programControl.getProgramsbyOrg);

programRouter.put(
  "/programs/:program_id/reject",
  programControl.rejectProgram
);

programRouter.put(
  "/programs/:program_id/approve",
  programControl.approveProgram
);

programRouter.put(
  "/programs/:program_id/feature",
  programControl.featureProgram
);

programRouter.post("/programs/:program_id/activate", programControl.activateProgram);

// Filter programs by user profile
programRouter.get("/programs/filter/:user_id", programControl.filterProgramsByUserProfile);

// Get all qualified programs and events for a user
programRouter.get("/qualified/:user_id", programControl.getAllQualifiedContent);

// Get all qualified featured programs and events for a user
programRouter.get("/qualified-featured/:user_id", programControl.getAllQualifiedFeaturedContent);

// Get all recommended programs for a user
programRouter.get("/programs/recommended/:user_id", programControl.filterRecommendedPrograms);


// Get all qualified programs and events for a user
programRouter.get("/qualified-content/:user_id", programControl.getAllQualifiedContentByUser);

// Requirements routes for programs
programRouter.get("/programs/:program_id/requirements", programControl.getRequirementsByProgramId);
programRouter.put("/programs/:program_id/requirements", programControl.updateRequirementsByProgramId);

module.exports = programRouter;
