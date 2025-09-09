const { Router } = require("express");
const resourceRouter = Router();
const resourceControl = require("../controllers/resource");
const { checkForAccessToken, checkIfAdmin } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");


/*-------------------ORGANIZATION-ROUTES-------------------*/

resourceRouter.use(corsHeader);

resourceRouter.post("/resource/:user_id/addResource", resourceControl.addResource);

resourceRouter.get("/resources/active", resourceControl.getAllActiveResources);

resourceRouter.get("/all-resources/:user_id", resourceControl.getAllResources);

resourceRouter.get("/resource/:resource_id", resourceControl.getResourceById);

resourceRouter.get("/resources/org/:org_id", resourceControl.getResourcesByOrgId);

resourceRouter.get("/resources/org/:org_id/active", resourceControl.getActiveResourcesByOrgId);

resourceRouter.put("/resources/:resource_id/update", resourceControl.updateResource);

resourceRouter.delete("/resources/:resource_id/delete", resourceControl.deleteResource);


resourceRouter.post("/resources/:resource_id/activate", resourceControl.activateResource);

resourceRouter.post("/resources/:resource_id/addTag", resourceControl.addResourceTag);

resourceRouter.delete(
  "/resources/:resource_id/deleteTag",
  resourceControl.deleteResourceTag
);

resourceRouter.post("/resources/:resource_id/addCategory", resourceControl.addResourceCategory);

resourceRouter.delete(
  "/resources/:resource_id/deleteCategory",
  resourceControl.deleteResourceCategory
);


module.exports = resourceRouter;
