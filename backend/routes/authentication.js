const { Router } = require("express");
const authRouter = Router();
const authControl = require("../controllers/authentication");
const corsHeader = require("../config/corsHeader");
const { checkForOrg, checkForUser } = require("../helpers/validation");

authRouter.use(corsHeader);

/*-------------AUTHENTICATION-ROUTES-------------*/

authRouter.post(
  "/signUp/metaAdmin",
  [checkForUser],
  authControl.signUpMetaAdmin
);

authRouter.post(
  "/signUp/bxdpAdmin",
  [checkForUser],
  authControl.signUpBxdpAdmin
);

authRouter.post(
  "/signUp/organization",
  [checkForOrg],
  authControl.signUpOrganization
);

authRouter.post(
  "/signUp/org/:org_id/orgAdmin",
  [checkForUser],
  authControl.signUpOrgAdmin
);

authRouter.post(
  "/signUp/org/:org_id/orgManager",
  [checkForUser],
  authControl.signUpOrgManager
);

authRouter.post(
  "/signUp/org/:org_id/orgStaff",
  [checkForUser],
  authControl.signUpOrgUser
);

authRouter.post("/signUp/user/org", [checkForUser], authControl.signUpNewOrgUser);

authRouter.post("/signUp/user", authControl.signUpUser);

authRouter.post("/login", authControl.loginUser);

authRouter.put("/signUp/user/confirm_email",authControl.verifyEmail)

authRouter.put("/logout", authControl.logoutUser);

module.exports = authRouter;
