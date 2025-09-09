const { Router } = require("express");
const imageRouter = Router();
const imageControl = require("../controllers/image");
const multer = require('multer')
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload');


imageRouter.post("/files", multer().single('file'),imageControl.fileUpload)
imageRouter.get("/image/generate-url", imageControl.generatePresignedUrl);
imageRouter.put("/orgs/:org_id/update-logo", imageControl.updateOrgLogo);
imageRouter.put("/orgs/:org_id/update-banner", imageControl.updateOrgBanner);
imageRouter.put(
  "/programs/:program_id/update-banner",
  imageControl.updateProgramBanner
);
imageRouter.put(
  "/events/:event_id/update-banner",
  imageControl.updateEventBanner
);
imageRouter.put("/skills/:skill_id/update-icon", imageControl.updateSkillIcon);

module.exports = imageRouter;
