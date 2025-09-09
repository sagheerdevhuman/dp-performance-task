require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const { transporter } = require("../config/email");
const { passwordGenerator } = require("../config/passwordGenerator");
const { User, Organization, InviteToken } = require("../models");

/*-----------------BXDP-STAFF-PROMOTION-CONTROLLERS--------------------*/

const metaToBxdpAdmin = async (req, res) => {
  const { user_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { is_meta_admin: true },
          { is_bxdp_admin: false },
          { is_org_admin: false },
          { is_org_manager: false },
          { is_org_user: false },
        ],
      },
    });
    // console.log("Your user --->", user);

    /*----------Changing-User-Role-----------*/
    if (user) {
      user.is_meta_admin = false;
      user.is_bxdp_admin = true;

      await user.save();
      // console.log("Your user --->", user);

      if (user.is_bxdp_admin) {
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User is now a bxdp admin!!!",
          data: user,
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "User with that id is not found!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const bxdpToMetaAdmin = async (req, res) => {
  const { user_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { is_meta_admin: false },
          { is_bxdp_admin: true },
          { is_org_admin: false },
          { is_org_manager: false },
          { is_org_user: false },
        ],
      },
    });

    /*----------Changing-User-Role-----------*/
    if (user) {
      user.is_meta_admin = true;
      user.is_bxdp_admin = false;

      await user.save();
      // console.log("Your user --->", user);

      if (user.is_meta_admin) {
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User is now a meta admin!!!",
          data: user,
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "User with that id is not found!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-----------------ORGANIZATION-STAFF-PROMOTION-CONTROLLERS--------------*/

const orgStaffToAdmin = async (req, res) => {
  const { user_id, org_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { org_id: org_id },
          { user_id: user_id },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_admin: false },
          { [Op.or]: [{ is_org_manager: true }, { is_org_user: true }] },
        ],
      },
    });
    // return console.log("Your user --->", user);

    /*----------Changing-User-Role-----------*/
    if (user) {
      user.is_org_admin = true;
      user.is_org_manager = false;
      user.is_org_user = false;

      await user.save();
      // console.log("Your user --->", user);

      if (user.is_org_admin) {
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User is now a org admin!!!",
          data: user,
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "User with that id is not found!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const orgStaffToManager = async (req, res) => {
  const { user_id, org_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { org_id: org_id },
          { user_id: user_id },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_manager: false },
          { [Op.or]: [{ is_org_admin: true }, { is_org_user: true }] },
        ],
      },
    });
    // console.log("Your user --->", user);

    /*----------Changing-User-Role-----------*/
    if (user) {
      user.is_org_admin = false;
      user.is_org_manager = true;
      user.is_org_user = false;

      await user.save();
      // console.log("Your user --->", user);

      if (user.is_org_manager) {
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User is now a org manager!!!",
          data: user,
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "User with that id is not found!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const orgStaffToUser = async (req, res) => {
  const { user_id, org_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { org_id: org_id },
          { user_id: user_id },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_user: false },
          { [Op.or]: [{ is_org_admin: true }, { is_org_manager: true }] },
        ],
      },
    });
    // console.log("Your user --->", user);

    /*----------Changing-User-Role-----------*/
    if (user) {
      user.is_org_admin = false;
      user.is_org_manager = false;
      user.is_org_user = true;

      await user.save();
      // console.log("Your user --->", user);

      if (user.is_org_user) {
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User is now a org user!!!",
          data: user,
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "User with that id is not found!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  metaToBxdpAdmin,
  bxdpToMetaAdmin,
  orgStaffToAdmin,
  orgStaffToManager,
  orgStaffToUser,
};
