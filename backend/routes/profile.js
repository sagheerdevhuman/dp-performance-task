const { Router } = require("express");
const profileRouter = Router();
const profileControl = require("../controllers/profile");
const { checkForAccessToken, checkIfAdmin } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");


/*-------------------ORGANIZATION-ROUTES-------------------*/

profileRouter.use(corsHeader);

profileRouter.post("/profile/add", profileControl.addProfile);

profileRouter.get("/info/:user_id", profileControl.getProfileByUserId);

profileRouter.put("/profile/preferences", profileControl.updatePreferences);

profileRouter.delete("/profile/:user_id/delete", profileControl.deleteProfile);


profileRouter.put("/profile", profileControl.updateProfile);



module.exports = profileRouter;
