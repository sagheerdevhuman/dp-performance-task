const { Router } = require("express");
const userRouter = Router();
const userControl = require("../controllers/user");
const { checkForAccessToken } = require("../helpers/validation");
const corsHeader = require("../config/corsHeader");

userRouter.use(corsHeader);

/*-----------------------BXDP-ADMIN-ROUTES-----------------------*/
 userRouter.get("/users",  userControl.getAllUsers);
 
 userRouter.get("/users/:user_id",  userControl.getUserById);

 userRouter.delete(
  "/users/:user_id/delete",
  userControl.deleteUser
);

userRouter.get(
  "/bxdp/staff",
  [checkForAccessToken],
  userControl.getAllBxdpStaff
);

userRouter.get(
  "/bxdp/staff/metaAdmins",
  [checkForAccessToken],
  userControl.getAllMetaAdmin
);

userRouter.get(
  "/bxdp/staff/admins",
  [checkForAccessToken],
  userControl.getAllBxdpAdmin
);

userRouter.put(
  "/bxdp/changeActiveStatus/:user_id/deactivate",
  [checkForAccessToken],
  userControl.deactivateBxdpStaff
);

userRouter.put(
  "/bxdp/changeActiveStatus/:user_id/activate",
  [checkForAccessToken],
  userControl.activateBxdpStaff
);

userRouter.delete(
  "/bxdp/deleteUser/:user_id/delete",
  [checkForAccessToken],
  userControl.deleteBxdpStaff
);
userRouter.get("/user/:user_id", userControl.getUserById);   

userRouter.put("/user/:user_id/settings", userControl.settingsUser);

/*-----------------------USER-ROUTES-----------------------*/
userRouter.get(
  "/orgs/:org_id/staff",

  userControl.getAllOrgStaff
);

userRouter.get(
  "/orgs/:org_id/admins",
  [checkForAccessToken],
  userControl.getAllOrgAdmins
);

userRouter.get(
  "/orgs/:org_id/managers",
  [checkForAccessToken],
  userControl.getAllOrgManagers
);

userRouter.get(
  "/orgs/:org_id/users",
  [checkForAccessToken],
  userControl.getAllOrgUsers
);

userRouter.put(
  "/orgs/:org_id/changeActiveStatus/:user_id/deactivate",
  userControl.deactivateOrgStaff
);

userRouter.put(
  "/orgs/:org_id/changeActiveStatus/:user_id/activate",
  userControl.activateOrgStaff
);

userRouter.delete(
  "/orgs/:org_id/deleteUser/:user_id/delete",
  userControl.deleteOrgStaff
);

/*-----------------------USER-ROUTES-----------------------*/
userRouter.put(
  "/users/:user_id/update",
  // [checkForAccessToken],
  userControl.updateUser
);
userRouter.put(
  "/users/:user_id/updatePassword",
  userControl.updateUserPassword
);

userRouter.post(
  "/error",
  userControl.reportBug
);


module.exports = userRouter;
