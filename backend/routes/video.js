const { Router } = require("express");
const videoRouter = Router();
const videoControl = require("../controllers/video");
const corsHeader = require("../config/corsHeader");

videoRouter.use(corsHeader);

// Create Video
videoRouter.post("/video", videoControl.createVideo);

// Get all Videos (optionally by org_id)
videoRouter.get("/videos", videoControl.getVideos);

// Get videos by organization ID
videoRouter.get("/videos/org/:org_id", videoControl.getVideosByOrgId);

// Get videos by tag ID
videoRouter.post("/videos/by_tag", videoControl.getVideosByTagId);

// Get single Video by video_id
videoRouter.get("/video/:video_id", videoControl.getVideoById);

// Update Video
videoRouter.put("/video/:video_id", videoControl.updateVideo);

// Delete Video
videoRouter.delete("/video/:video_id", videoControl.deleteVideo);

module.exports = videoRouter; 