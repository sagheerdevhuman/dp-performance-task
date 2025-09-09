require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const { transporter } = require("../config/email");
const { passwordGenerator } = require("../config/passwordGenerator");
const { User, Organization, InviteToken, Profile } = require("../models");

/*---------------BXDP-STAFF-CONTROLLERS------------------*/

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({raw:true});

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "Users not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllBxdpStaff = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          {
            [Op.or]: [{ is_meta_admin: true }, { is_bxdp_admin: true }],
          },
          {
            [Op.and]: [
              { is_org_admin: false },
              { is_org_manager: false },
              { is_org_user: false },
            ],
          },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "BXDP staff not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllMetaAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          { is_meta_admin: true },
          { is_bxdp_admin: false },
          { is_org_admin: false },
          { is_org_manager: false },
          { is_org_user: false },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "Meta Admins not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllBxdpAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          { is_meta_admin: false },
          { is_bxdp_admin: true },
          { is_org_admin: false },
          { is_org_manager: false },
          { is_org_user: false },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({ message: "BXDP Admins not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const deactivateBxdpStaff = async (req, res) => {
  const { user_id } = req.params;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: null },
          { is_active: true },
          { [Op.or]: [{ is_meta_admin: true }, { is_bxdp_admin: true }] },
        ],
      },
    });

    /*-------------Changing-Active-Status-------------*/
    if (user) {
      user.is_active = false;
      await user.save();
      // console.log("Your user --->", user);

      return res.status(200).json({ message: "User is now deactivated!!!" });
    }

    return res
      .status(404)
      .json({ message: "User with that id is not found!!!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const activateBxdpStaff = async (req, res) => {
  const { user_id } = req.params;
  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: null },
          { is_active: false },
          { [Op.or]: [{ is_meta_admin: true }, { is_bxdp_admin: true }] },
        ],
      },
    });

    /*-------------Changing-Active-Status-------------*/
    if (user) {
      user.is_active = true;
      await user.save();
      // console.log("Your user --->", user);

      return res.status(200).json({ message: "user is now active!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "User with that id is not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const deleteBxdpStaff = async (req, res) => {
  const { user_id } = req.params;

  try {
    /*------------Find-And-Delete-User--------------*/
    const userToBeDeleted = await User.destroy({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { [Op.or]: [{ is_meta_admin: true }, { is_bxdp_admin: true }] },
        ],
      },
    });

    const inviteToken = await InviteToken.destroy({
      where: { user_id: user_id },
    });

    /*-------------Successful-Server-Response--------------*/
    if (userToBeDeleted) {
      return res.status(200).json({ message: "User has been deleted!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "User with that id is not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*---------------ORGANIZATION-STAFF-CONTROLLERS------------------*/

const getAllOrgStaff = async (req, res) => {
  const { org_id } = req.params;
  try {
    /*-------------Retreive-Staff-------------*/
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: org_id },
          {
            [Op.or]: [
              { is_org_admin: true },
              { is_org_manager: true },
              { is_org_user: true },
            ],
          },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "Unable to find staff under an organization with that id!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrgAdmins = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_admin: true },
          { is_org_manager: false },
          { is_org_user: false },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/

    return res.status(404).json({
      message: "Unable to find staff under an organization with that id!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrgManagers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_admin: false },
          { is_org_manager: true },
          { is_org_user: false },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/

    return res.status(404).json({
      message: "Unable to find staff under an organization with that id!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrgUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          { org_id: null },
          { is_meta_admin: false },
          { is_bxdp_admin: false },
          { is_org_admin: false },
          { is_org_manager: false },
          { is_org_user: true },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (users) {
      return res.status(200).json({ users });
    }

    /*-------------Failed-Server-Response--------------*/

    return res.status(404).json({
      message: "Unable to find staff under an organization with that id!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const deactivateOrgStaff = async (req, res) => {
  const { user_id, org_id } = req.params;
  try {
    /*----------Looking-For-Org-Staff-----------*/
    const userToBeDeactivated = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: org_id },
          { is_active: true },
          {
            [Op.or]: [
              { is_org_admin: true },
              { is_org_manager: true },
              { is_org_user: true },
            ],
          },
        ],
      },
    });

    /*-------------Deactivating-Org-Staff----------------*/
    if (userToBeDeactivated) {
      userToBeDeactivated.is_active = false;
      userToBeDeactivated.save();
      return res.status(200).json({ message: "User is now deactivated!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "User under that organization is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const activateOrgStaff = async (req, res) => {
  const { user_id, org_id } = req.params;

  try {
    /*----------Looking-For-Org-Staff-----------*/
    const userToBeActivated = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: org_id },
          { is_active: false },
          {
            [Op.or]: [
              { is_org_admin: true },
              { is_org_manager: true },
              { is_org_user: true },
            ],
          },
        ],
      },
    });

    // return console.log("Your user --->", userToBeActivated);

    /*-------------Activating-Org-Staff----------------*/
    if (userToBeActivated) {
      userToBeActivated.is_active = true;
      userToBeActivated.save();
      return res
        .status(200)
        .json({ message: "User activated successfully!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "User under that organization is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrgStaff = async (req, res) => {
  const { user_id, org_id } = req.params;
  try {
    /*------------Find-And-Delete-User--------------*/
    const userToBeDeleted = await User.destroy({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: org_id },
          {
            [Op.or]: [
              { is_org_admin: true },
              { is_org_manager: true },
              { is_org_user: true },
            ],
          },
        ],
      },
    });

    /*-----------Successful-Server-Response------------*/
    if (userToBeDeleted) {
      return res.status(200).json({
        message: "User was deleted successfully!!!",
      });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "User under that organization is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const {
    first_name,
    last_name,
    profile_url,
    user_email,
  } = req.body;
  try {
    /*------------Find-User--------------*/
    const user = await User.findOne({
      where: {
          user_id: user_id,
      },
    });
    console.log("Your user --->", profile_url);

    /*-----------Successful-Server-Response------------*/
    if (user) {
      /*----------Compare-Encrypted-Password-With-Input-----------*/

        user.first_name = first_name;
        user.last_name = last_name;
        user.profile_img = profile_url;
        user.user_email = user_email;
        await user.save();
        
      
      // /*----------Send_User_Update-----------*/
      // const message = {
      //   from: {
      //     name: `${process.env.DEV_FROM_EMAIL_NAME}`,
      //     address: process.env.DEV_FROM_EMAIL,
      //   },
      //   to: {
      //     name: `${first_name} ${last_name}`,
      //     address: user_email,
      //   },
      //   subject: " Digital Pipeline Profile Updated!!!",
      //   html: `<body style="font-family: Arial; padding: 20px;">
      //           <p>Hey ${first_name} ${last_name} from The Bronx Digital Pipeline!</p>
      //           <p>Your Profile has been updated</p>

      //           <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
      //         </body>`,
      // };

      // /*------------Sending-Welcome-Email------------*/
      // transporter.sendMail(message, function (error, success) {
      //   if (error) {
      //     console.log(error, null);
      //   } else {
      //     return res.status(200).json({user});
      //   }
      // });
      return res.status(200).json({user});
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "A User associated with that ID is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  const { user_id } = req.params;
  const {
    current_password,
    password_a,
    password_b,
  } = req.body;
  try {
    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*------------Find-User--------------*/
    const userToBeUpdated =  await User.findOne({
      where: { user_id: user_id },
    });
    /*-----------Successful-Server-Response------------*/
    if (userToBeUpdated) {
      /*----------Compare-Encrypted-Password-With-Input-----------*/
      const passwordMatch = await bcrypt.compare(
        current_password,
        userToBeUpdated.password
      );
      console.log("passwordMatch --->", passwordMatch);
     
      if (passwordMatch === true && password_a && password_b) {
        /*----------------Encrypt-Password-----------------*/
        console.log("passwordMatch --->", passwordMatch);
        const salt = await bcrypt.genSalt(10);
        console.log("Your salt --->", salt);
        console.log("Your salt --->", salt);
        const passwordHash = bcrypt.hashSync(password_a, salt);
        console.log("Your password hash --->", passwordHash);
        userToBeUpdated.password = passwordHash;
        await userToBeUpdated.save();
        return res.status(200).json({ user:userToBeUpdated,
          message: "User was updated successfully!!!",
        });
      }
      
      // const welcomeMessage = {
      //   from: {
      //     name: `${process.env.DEV_FROM_EMAIL_NAME}`,
      //     address: process.env.DEV_FROM_EMAIL,
      //   },
      //   to: {
      //     name: `${userToBeUpdated.first_name} ${userToBeUpdated.last_name}`,
      //     address: userToBeUpdated.user_email,
      //   },
      //   subject: `Digital Pipeline!`,
      //   html: `<body style="font-family: Arial; padding: 20px;">
      //   <p>Hey ${userToBeUpdated.first_name} ${userToBeUpdated.last_name} from The Bronx Digital Pipeline!</p>
      //   <p>Your Password has been updated</p>

      //   <P>Thank you,</p>  
      //   <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
        
      //   </body>`,
      // };
      
      // await transporter.verify();
      // transporter.sendMail(welcomeMessage, function (error, success) {
      //   if (error) {
      //     console.log(error, null);
      //   } else if (success) {
      //     return res.status(200).json({
      //       user:userToBeUpdated,
      //       message: "User was updated successfully!!!",
      //     });
      //   }
      // });
    }
    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "A User associated with that ID is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


const reportBug = async (req, res) => {
  const {
    user_id,
    subject,
    description
  } = req.body;
  try {

    /*----------------Get-User----------------*/
    const user =  await User.findOne({
      where: { user_id: user_id },
    });
    

    if (user) {
      
      const errorMessage = {
        from: {
          name:  `${user.first_name} ${user.last_name}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name}`,
          address: process.env.DEV_ERROR_EMAIL,
        },
        subject: `${subject}`,
        html: `${description}`,
      };

      /*------------Sending-Error-Email------------*/
      transporter.sendMail(errorMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User not found!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    
    /*------------Find-User--------------*/
    const user = await User.findOne({
      where: { user_id: user_id },
      include: [
        {
          model: Profile,
          as: 'profile',
        },
      ],
    });

    /*-----------Successful-Server-Response------------*/
    if (user) {
  
      return res.status(200).json({user});
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "A User associated with that ID is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


const deleteUser =  async (req, res) => {
  const { user_id} = req.params;
  try {
    /*------------Find-And-Delete-User--------------*/
    const userToBeDeleted = await User.destroy({
      where: { user_id: user_id },
    });

    /*-----------Successful-Server-Response------------*/
    if (userToBeDeleted) {
      return res.status(200).json({
        message: "User was deleted successfully!!!",
      });
    }

    /*-------------Failed-Server-Response--------------*/
    return res.status(404).json({
      message: "User is not found!!!",
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};
const settingsUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    console.log("Your user_id --->", user_id);
    const user = await User.findOne({ where: { user_id: user_id }});
    // console.log("Your user --->", user);

    if (user) {
      console.log("Your user --->", user);
      user.profile_cofirmed = true;
      user.settings_confirmed = true;
      await user.save();
      return res.status(200).json({ message: "User settings updated" });
    }

    return res
      .status(404)
      .json({ message: "An account with that id is not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};




/*---------------WEBSITE-USER-CONTROLLERS------------------*/

module.exports = {
  getAllUsers,
  getAllBxdpStaff,
  getAllMetaAdmin,
  getAllBxdpAdmin,
  deactivateBxdpStaff,
  activateBxdpStaff,
  deleteBxdpStaff,
  getAllOrgStaff,
  getAllOrgAdmins,
  getAllOrgManagers,
  getAllOrgUsers,
  deactivateOrgStaff,
  activateOrgStaff,
  deleteOrgStaff,
  updateUser,
  updateUserPassword,
  reportBug,
  getUserById,
  deleteUser,
  settingsUser
};
