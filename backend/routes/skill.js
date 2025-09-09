const {Router} = require('express')
const skillRouter = Router()
const skillControl = require('../controllers/skill')
const corsHeader = require("../config/corsHeader");

skillRouter.use(corsHeader)

skillRouter.post(
  "/skill/addSkill/",
  skillControl.addSkill
)
skillRouter.get(
  "/skills",
  skillControl.getAllSkills
)

skillRouter.delete(
  "/skills/:skill_id/delete",
  skillControl.deleteSkill
);

skillRouter.put(
  "/skills/:skill_id", 
  skillControl.updateSkill
);


module.exports = skillRouter;