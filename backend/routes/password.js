const { Router } = require("express");
const passwordRouter = Router();
const passwordControl = require("../controllers/password");
const corsHeader = require("../config/corsHeader");
const {
  checkForAccessToken,
  checkForResetPasswordToken,
} = require("../helpers/validation");

/*-------------RESET-PASSWORD-ROUTES-------------*/

passwordRouter.use(corsHeader);

passwordRouter.post("/password/resetLink", passwordControl.sendResetLink);

passwordRouter.post(
  "/password/reset",
  [checkForResetPasswordToken],
  passwordControl.resetPassword
);

passwordRouter.post(
  "/password/change",
  [checkForAccessToken],
  passwordControl.changePassword
);

module.exports = passwordRouter;
