const { Router } = require("express");
const inviteRouter = Router();
const inviteControl = require("../controllers/invitation");
const corsHeader = require("../config/corsHeader");
const {
  checkForUser,
  checkForOrg,
  checkForAccessToken,
  checkForInviteToken,
} = require("../helpers/validation");

/*-------------INVITATION-BXDP-ROUTES-------------*/

inviteRouter.use(corsHeader);

inviteRouter.post(
  "/invite/metaAdmin",
  [checkForAccessToken],
  [checkForUser],
  inviteControl.inviteMetaAdmin
);

inviteRouter.post(
  "/invite/bxdpAdmin",
  [checkForAccessToken],
  [checkForUser],
  inviteControl.inviteBxdpAdmin
);

inviteRouter.put(
  "/invite/bxdpStaff/:user_id/resetPassword",
  inviteControl.resetGeneratedPasswordBxdp
);

/*-------------INVITATION-ORG-ROUTES-------------*/

inviteRouter.post(
  "/invite/organization",
  [checkForAccessToken],
  inviteControl.inviteOrganization
);

inviteRouter.post(
  "/invite/org/:org_id/orgAdmin",
  [checkForUser],
  inviteControl.inviteOrgAdmin
);
inviteRouter.post(
  "/invite/org/:org_id/orgManager",
  [checkForUser],
  inviteControl.inviteOrgManager
);

inviteRouter.post(
  "/invite/org/:org_id/orgUser",
  [checkForUser],
  inviteControl.inviteOrgUser
);

inviteRouter.put(
  "/invite/org/:org_id/orgStaff/:user_id/resetPassword",
  inviteControl.resetGeneratedPasswordOrg
);

module.exports = inviteRouter;
