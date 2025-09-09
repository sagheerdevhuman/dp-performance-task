const {Router} = require('express')
const tagRouter = Router()
const tagControl = require('../controllers/tag')
const corsHeader = require("../config/corsHeader");

tagRouter.use(corsHeader)

tagRouter.post(
  "/tag/addTag/",
  tagControl.addTag
)
tagRouter.get(
  "/tags",
  tagControl.getAllTags
)

tagRouter.delete(
  "/tags/:tag_id/delete",
  tagControl.deleteTag
);


module.exports = tagRouter;