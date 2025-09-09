const { Router } = require("express");
const promotionRouter = Router();
const promotionControl = require("../controllers/userPromotion");
const { checkForAccessToken } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");

promotionRouter.use(corsHeader);

/*-----------------------BXDP-ADMIN-ROUTES-----------------------*/
promotionRouter.put(
  "/bxdp/changeRole/:user_id/userToBxdpAdmin",
  [checkForAccessToken],
  promotionControl.metaToBxdpAdmin
);

promotionRouter.put(
  "/bxdp/changeRole/:user_id/userToMetaAdmin",
  [checkForAccessToken],
  promotionControl.bxdpToMetaAdmin
);

/*-----------------------ORG-STAFF-ROUTES-----------------------*/
promotionRouter.put(
  "/orgs/:org_id/changeRole/:user_id/staffToAdmin",
  promotionControl.orgStaffToAdmin
);

promotionRouter.put(
  "/orgs/:org_id/changeRole/:user_id/staffToManager",
  promotionControl.orgStaffToManager
);

promotionRouter.put(
  "/orgs/:org_id/changeRole/:user_id/staffToUser",
  promotionControl.orgStaffToUser
);

module.exports = promotionRouter;
