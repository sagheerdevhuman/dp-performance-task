require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Organization } = require("../models");
const auth = require("../config/auth");

/*-------------VALIDATION-HELPER-------------*/

const checkForUser = (req, res, next) => {
  const { email } = req.body;
  /*-----------Check-for-existing-User-----------*/
  const userEmail = User.findOne({
    where: { user_email: email },
  });
  userEmail.then((user) => {
    if (user) {
      res.status(404).json({
        message: `An account associated with the email ${email} already exist`,
      });
      return;
    }
    next();
  });
};

const checkForOrg = (req, res, next) => {
  const { name } = req.body;
  /*-----------Check-for-existing-User-----------*/
  const orgName = Organization.findOne({
    where: { name: name },
  });
  orgName.then((org) => {
    if (org) {
      res.status(404).json({ message: "Organization already exists!" });
      return;
    }
    next();
  });
};

const checkForAccessToken = (req, res, next) => {
  /*--------------Get-Access-Token--------------*/
  let accessToken = req.headers["x-access-token"];
  if (!accessToken) {
    return res.status(403).json({ message: "Access Token required!" });
  }
  /*------------Verify-Access-token------------*/
  const secret = auth.secret_key;
  jwt.verify(accessToken, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized User!" });
    }
    req.user_id = decoded.user_id;
    console.log("Your user id ------>", {
      requested: req.user_id,
      decoded: decoded.user_id,
    });
    next();
  });
};

const checkForInviteToken = (req, res, next) => {
  /*---------------Get-Invite-Token---------------*/
  const { invite_token } = req.body;
  const inviteToken = decodeURIComponent(invite_token);
  // console.log("Invite token ------->", inviteToken);
  /*-------------Verify-Invite-token-------------*/
  const inviteSecret = auth.invite_secret_key;
  jwt.verify(
    inviteToken,
    Buffer.from(inviteSecret, "base64"),
    (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: "Unauthorized/invalid Invite Token!",
        });
      }
      // console.log("Your decoded text ----->", decoded);
      // console.log("Your invite text ----->", process.env.INVITE_TEXT);
      // console.log("Your decoded ivite data ----->", decoded.inviteData);
      process.env.INVITE_TEXT = decoded.inviteData;
      next();
    }
  );
};

const checkForResetPasswordToken = (req, res, next) => {
  /*---------------Get-Reset-Token---------------*/
  const { reset_token } = req.body;
  const resetToken = decodeURIComponent(reset_token);
  // console.log("Reset token ------->", resetToken);
  /*-------------Verify-Invite-token-------------*/
  const resetSecret = auth.reset_secret_key;
  jwt.verify(
    resetToken,
    Buffer.from(resetSecret, "base64"),
    (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: "Unauthorized/invalid Reset Token!",
        });
      }
      // console.log("Your decoded text ----->", decoded);
      // console.log("Your reset text ----->", process.env.RESET_TEXT);
      // console.log("Your decoded ivite data ----->", decoded.resetData);
      process.env.RESET_TEXT = decoded.resetData;
      next();
    }
  );
};

const checkIfAdminManager = async (req, res, next) => {
  const user_id = req.user_id;
  // console.log("Your req ----->", req);
  // console.log("Your req body ----->", req.body);
  /*-------------Check-if-Admin-Manager-------------*/
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user.is_admin_manager === true) {
      next();
      return;
    }
  } catch (error) {
    res.status(403).json({ message: "Must be a top level Admin to access!" });
  }
};

const checkIfOrgAdmin = async (req, res, next) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  // console.log("Your req ----->", req);
  // console.log("Your req body ----->", req.body);
  /*---------------Check-if-Admin---------------*/
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user.is_org_admin === true) {
      next();
      return;
    }
  } catch (error) {
    res
      .status(403)
      .json({ message: "Must be a Admin in this organization to access!" });
  }
};

const checkIfOrgManager = async (req, res, next) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  // console.log("Your req ----->", req);
  // console.log("Your req body ----->", req.body);
  /*---------------Check-if-Admin---------------*/
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user.is_org_manager === true || user.is_org_admin === true) {
      next();
      return;
    }
  } catch (error) {
    res.status(403).json({
      message: "Must be a Admin Manager in this organization to access!",
    });
  }
};

const checkIfOrgStaff = async (req, res, next) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  // console.log("Your req ----->", req);
  // console.log("Your req body ----->", req.body);
  /*---------------Check-if-Admin---------------*/
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user.is_org_user === true) {
      next();
      return;
    }
  } catch (error) {
    res.status(403).json({
      message: "Must be a Staff Member in this organization to access!",
    });
  }
};

const checkIfUser = async (req, res, next) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  // console.log("Your req ----->", req);
  // console.log("Your req body ----->", req.body);
  /*---------------Check-if-Admin---------------*/
  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user.is_user === true) {
      next();
      return;
    }
  } catch (error) {
    res.status(403).json({
      message: "Must be a registerd user to access!",
    });
  }
};

const validateEmail = (email) => {
  // Email regex pattern for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Basic validation checks
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required and must be a string' };
  }
  
  // Check if email is not empty and has proper format
  if (email.trim().length === 0) {
    return { isValid: false, message: 'Email cannot be empty' };
  }
  
  // Check email format using regex
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  // Check email length (reasonable limits)
  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long (maximum 254 characters)' };
  }
  
  // Check for common invalid patterns
  if (email.includes('..') || email.includes('--') || email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true, message: 'Email is valid' };
};

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  const validation = validateEmail(email);
  
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }
  
  next();
};

module.exports = {
  checkForUser,
  checkForOrg,
  checkForAccessToken,
  checkForInviteToken,
  checkForResetPasswordToken,
  checkIfAdminManager,
  checkIfOrgAdmin,
  checkIfOrgManager,
  checkIfOrgStaff,
  checkIfUser,
  validateEmail,
  validateEmailMiddleware,
};
