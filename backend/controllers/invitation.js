require("dotenv").config();
const bcrypt = require("bcryptjs");
const e = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const { transporter } = require("../config/email");
const { passwordGenerator } = require("../config/passwordGenerator");
const { User, Organization, InviteToken } = require("../models");

/*-------------INVITE-BXDP-STAFF-CONTROLLERS-------------*/

const inviteMetaAdmin = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Email-Validation--------------*/
    const { validateEmail } = require("../helpers/validation");
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: emailValidation.message,
      });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !was_invited ||
      !is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(400).json({
        message: "User is not under the correct role of meta admin!!!",
      });
    }

    /*-------Generating-Password-for-Invited-Staff-Member-------*/
    let generatedPassword = passwordGenerator;

    /*----------------Creating-New-User----------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: generatedPassword,
      password_reset_required: true,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: true,
      is_bxdp_admin: false,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: false,
      is_user: true,
      was_invited: true,
      is_token_used: false,
      email_cofirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status----------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*-----------------Generating-Invite-Token---------------*/
      const inviteSecret = auth.invite_secret_key;
      const inviteText = process.env.INVITE_TEXT;
      const token = jwt.sign(
        { inviteData: inviteText },
        Buffer.from(inviteSecret, "base64"),
        {
          algorithm: "HS256",
          expiresIn: "24h", //24 hour period
        }
      );

      const inviteToken = await InviteToken.create({
        user_id: user.user_id,
        invite_first_name: user.first_name,
        invite_last_name: user.last_name,
        invite_email: user.user_email,
        invite_token: token,
        is_token_used: false,
      });
      await inviteToken.save();
      // console.log("Your token --->", token);

      user.invite_token = token;
      await user.save();
      // console.log("Your user --->", user);

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name} ${user.last_name}`,
          address: user.user_email,
        },
        subject: `Welcome to Digital Pipeline!`,
        html: `
                  <body style="font-family: Arial; padding: 20px;">
         <p>Hello from Digital Pipeline!</p>
         <p>Your have been invited as an Digital Pipeline Meta Admin!!!</p>
         <p>You will be required to change your password, please use your generated password: ${user.password} to login.
         <p>Click Below to Login</p>
         <div>
            <a href="${inviteLink}" target="_blank">
            <button>Login</button>
            </a>
         </div>
         <p>Thank you,</p>
         <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
                </body>
      `,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "Invite email sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const inviteBxdpAdmin = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Email-Validation--------------*/
    const { validateEmail } = require("../helpers/validation");
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: emailValidation.message,
      });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !was_invited ||
      !!is_meta_admin ||
      !is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(400).json({
        message: "User is not under the correct role of bxdp admin!!!",
      });
    }

    /*-------Generating-Password-for-Invited-Staff-Member-------*/
    let generatedPassword = passwordGenerator;

    /*----------------Creating-New-User----------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: generatedPassword,
      password_reset_required: true,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: true,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: false,
      is_user: true,
      was_invited: true,
      is_token_used: false,
      email_cofirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status----------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*-----------------Generating-Invite-Token---------------*/
      const inviteSecret = auth.invite_secret_key;
      const inviteText = process.env.INVITE_TEXT;
      const token = jwt.sign(
        { inviteData: inviteText },
        Buffer.from(inviteSecret, "base64"),
        {
          algorithm: "HS256",
          expiresIn: "24h", //24 hour period
        }
      );

      const inviteToken = await InviteToken.create({
        user_id: user.user_id,
        invite_first_name: user.first_name,
        invite_last_name: user.last_name,
        invite_email: user.user_email,
        invite_token: token,
        is_token_used: false,
      });

      await inviteToken.save();
      // console.log("Your token --->", token);

      user.invite_token = token;
      await user.save();
      // console.log("Your user --->", user);

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name} ${user.last_name}`,
          address: user.user_email,
        },
        subject: `Welcome to Digital Pipeline!`,
        html: `
                  <body style="font-family: Arial; padding: 20px;">
         <p>Hello from Digital Pipeline!</p>
         <p>Your have been invited as an Digital Pipeline Admin!!!</p>
         <p>You will be required to change your password, please use your generated password: ${user.password} to login.
         <p>Click Below to Login</p>
         <div>
            <a href="${inviteLink}" target="_blank">
            <button>Login</button>
            </a>
         </div>
         <p>Thank you,</p>
         <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
                </body>
      `,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "Invite email sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const resetGeneratedPasswordBxdp = async (req, res) => {
  const { user_id } = req.params;
  const {
    password_a,
    password_b,
    mou,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (
      (!is_meta_admin && !is_bxdp_admin) ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res
        .status(403)
        .json({ message: "User is not a member of the BXDP staff!!!" });
    }

    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { user_id: user_id },
          { org_id: null },
          { password_reset_required: true },
          { was_invited: true },
          { is_token_used: false },
          {
            [Op.or]: [{ is_meta_admin: true }, { is_bxdp_admin: true }],
          },
        ],
      },
    });

    if (user) {
      /*----------Confirm-Password-Inputs-Match----------*/
      if (password_a !== password_b) {
        return res
          .status(400)
          .json("Passwords do not match, please try again!!!");
      }

      /*----------------Encrypt-Password-----------------*/
      const salt = await bcrypt.genSalt(10);
      // console.log("Your salt --->", salt);
      const passwordHash = bcrypt.hashSync(password_a, salt);
      // console.log("Your password hash --->", passwordHash);

      /*----------------Changing-User-Data-----------------*/
      user.password = passwordHash;
      user.password_reset_required = false;
      user.is_token_used = true;
      user.mou = mou;
      user.invite_token = null;
      user.is_logged_in = false;
      await user.save();
      // console.log("Your user --->", user);

      /*----------Delete-Invite-Token-----------*/
      const usedToken = await InviteToken.destroy({
        where: {
          [Op.and]: [
            { user_id: user.user_id },
            { invite_email: user.user_email },
          ],
        },
      });

      return res
        .status(200)
        .json({ message: "Password Successfully Changed!!!" });
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

/*-------------INVITE-ORGANIZATION-STAFF-CONTROLLERS-------------*/

const inviteOrganization = async (req, res) => {
  const { 
    name,
    first_name, 
    last_name, 
    info_email, 
    was_invited, 
    logo_url, 
    banner_url  
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (!was_invited) {
      return res.status(400).json({
        message: "Organization was not invited!!!",
      });
    }

    /*----------Looking-for-Duplicate-Organizations----------*/
    const duplicateOrg = await Organization.findOne({
      where: {
        [Op.or]: [
          { name: name },
          { info_email: info_email },
          { [Op.and]: [{ name: name }, { info_email: info_email }] },
        ],
      },
    });

    /*-------------Failed-Server-Response--------------*/
    if (!!duplicateOrg) {
      return res.status(409).json({
        message:
          "An organization with that name and/or email already exists!!!",
      });
    }

    /*----------------Creating-New-Organization----------------*/
    const invitedOrg = await Organization.create({
      name: name,
      info_email: info_email,
      mou: false,
      is_approved: true,
      is_active: true,
      was_invited: true,
    });

    await invitedOrg.save();
    // console.log("Your organization --->", invitedOrg);

    if (invitedOrg) {
      /*----------Generating-Password-for-Invited-Org----------*/
      const password = passwordGenerator;

      /*----------------Creating-First-Org-Admin----------------*/
      const user = await User.create({
        org_id: invitedOrg.org_id,
        first_name: first_name,
        last_name: last_name,
        user_email: invitedOrg.info_email,
        password: password,
        password_reset_required: true,
        logo_url:logo_url,
        banner_url:banner_url,
        mou: false,
        is_approved: true,
        is_active: true,
        is_meta_admin: false,
        is_bxdp_admin: false,
        is_org_admin: true,
        is_org_manager: false,
        is_org_user: false,
        is_user: true,
        was_invited: true,
        is_token_used: false,
        email_cofirmed:true,
      });

      await user.save();

      // console.log("Your user --->", user);

      if (user) {
        /*---Checking-for-Generated-Invite-Tokens-&-Token-Status---*/
        const expireToken = await InviteToken.findOne({
          where: { invite_email: user.user_email },
        });

        if (expireToken || expireToken !== null) {
          expireToken.is_token_used = true;
          await expireToken.save();
        }

        /*-----------------Generating-Invite-Token---------------*/
        const inviteSecret = auth.invite_secret_key;
        const inviteText = process.env.INVITE_TEXT;
        const token = jwt.sign(
          { inviteData: inviteText },
          Buffer.from(inviteSecret, "base64"),
          {
            algorithm: "HS256",
            expiresIn: "24h", //24 hour period
          }
        );

        const inviteToken = await InviteToken.create({
          invite_first_name: user.first_name,
          invite_last_name: user.last_name,
          invite_email: user.user_email,
          invite_token: token,
          is_token_used: false,
        });

        await inviteToken.save();
        // console.log("Your token --->", token);

        user.invite_token = token;
        await user.save();
        // console.log("Your user --->", user);

        /*------------Drafting-Welcome-Email-&-Link------------*/
        const encodedToken = encodeURIComponent(token);
        const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

        const welcomeMessage = {
          from: {
            name: `${process.env.DEV_FROM_EMAIL_NAME}`,
            address: process.env.DEV_FROM_EMAIL,
          },
          to: {
            name: `${user.first_name} ${user.last_name}`,
            address: user.user_email,
          },
          subject: "Digital Pipeline Registration!!!",
          html: `
                  <body style="font-family: Arial; padding: 20px;">
           <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>

           <p>You will be required to change your password, please use your generated password: ${user.password} to login.
           <div>
              <a href="${inviteLink}" target="_blank">
                <button>Login</button>
              </a>
           </div>

          <p>For your security, this invite link expires after 24 hours.</p>
          <p>Please feel free to send an email to <strong><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank">${process.env.DEV_FROM_EMAIL}</a></strong> with any questions.</p>
          <p>Thank you and Welcome,</p>
          <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
            </body>`,
        };

        /*------------Sending-Welcome-Email------------*/
        transporter.sendMail(welcomeMessage, function (error, success) {
          if (error) {
            /*-----------Failed-Server-Response------------*/
            return res.status(500).json({
              message: error.message,
            });
          } else {
            /*-----------Successful-Server-Response------------*/
            return res.status(200).json({
             invitedOrg
            });
          }
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(500)
        .json({ message: "Organization creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const inviteOrgAdmin = async (req, res) => {
  const { org_id } = req.params;
  const {
    first_name,
    last_name,
    email,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Email-Validation--------------*/
    const { validateEmail } = require("../helpers/validation");
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: emailValidation.message,
      });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(400).json({
        message: "User is not under the correct role of org admin!!!",
      });
    }

    /*-------Generating-Password-for-Invited-Staff-Member-------*/
    let generatedPassword = passwordGenerator;

    /*----------------Creating-New-User----------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: generatedPassword,
      password_reset_required: true,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: true,
      is_org_manager: false,
      is_org_user: false,
      is_user: false,
      was_invited: true,
      is_token_used: false,
      email_cofirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    const org = await Organization.findOne({
      where:{ org_id: org_id},
    })

    if (user && org) {

      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status----------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*-----------------Generating-Invite-Token---------------*/
      const inviteSecret = auth.invite_secret_key;
      const inviteText = process.env.INVITE_TEXT;
      const token = jwt.sign(
        { inviteData: inviteText },
        Buffer.from(inviteSecret, "base64"),
        {
          algorithm: "HS256",
          expiresIn: "24h", //24 hour period
        }
      );

      const inviteToken = await InviteToken.create({
        user_id: user.user_id,
        invite_first_name: user.first_name,
        invite_last_name: user.last_name,
        invite_email: user.user_email,
        invite_token: token,
        is_token_used: false,
      });
      await inviteToken.save();
      // console.log("Your token --->", token);

      user.invite_token = token;
      await user.save();
      // console.log("Your user --->", user);

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name} ${user.last_name}`,
          address: user.user_email,
        },
        subject: `Welcome to Bronx Digital Pipeline!`,
        html: `
                  <body style="font-family: Arial; padding: 20px;">
         <p>Hello from Digital Pipeline!</p>
         <p>Your have been invited to ${org.name} as an admin!!!</p>
         <p>You will be required to change your password, please use your generated password: ${user.password} to login.
         <p>Click Below to Login</p>
         <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
         <p>Thank you,</p>
         <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
                </body>
      `,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "Invite email sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const inviteOrgManager = async (req, res) => {
  const { org_id } = req.params;
  const {
    first_name,
    last_name,
    email,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Email-Validation--------------*/
    const { validateEmail } = require("../helpers/validation");
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: emailValidation.message,
      });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !is_org_manager ||
      !!is_org_user
    ) {
      return res.status(400).json({
        message: "User is not under the correct role of org manager!!!",
      });
    }

    /*-------Generating-Password-for-Invited-Staff-Member-------*/
    let generatedPassword = passwordGenerator;

    /*----------------Creating-New-User----------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: generatedPassword,
      password_reset_required: true,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: false,
      is_org_manager: true,
      is_org_user: false,
      is_user: true,
      was_invited: true,
      is_token_used: false,
      email_cofirmed:true
    });

    await user.save();
    // console.log("Your user --->", user);
    const org = await Organization.findOne({
      where:{ org_id: org_id},
    })

    if (user && org) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status----------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*-----------------Generating-Invite-Token---------------*/
      const inviteSecret = auth.invite_secret_key;
      const inviteText = process.env.INVITE_TEXT;
      const token = jwt.sign(
        { inviteData: inviteText },
        Buffer.from(inviteSecret, "base64"),
        {
          algorithm: "HS256",
          expiresIn: "24h", //24 hour period
        }
      );

      const inviteToken = await InviteToken.create({
        user_id: user.user_id,
        invite_first_name: user.first_name,
        invite_last_name: user.last_name,
        invite_email: user.user_email,
        invite_token: token,
        is_token_used: false,
      });
      await inviteToken.save();
      // console.log("Your token --->", token);

      user.invite_token = token;
      await user.save();
      // console.log("Your user --->", user);

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name} ${user.last_name}`,
          address: user.user_email,
        },
        subject: `Welcome to Digital Pipeline!`,
        html: `
                  <body style="font-family: Arial; padding: 20px;">
         <p>Hello from Digital Pipeline!</p>
         <p>Your have been invited to ${org.name} as staff!!!</p>
         <p>You will be required to change your password, please use your generated password: ${user.password} to login.
         <p>Click Below to Login</p>
         <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
         <p>Thank you,</p>
         <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
                </body>
      `,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "Invite email sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const inviteOrgUser = async (req, res) => {
  const { org_id } = req.params;
  const {
    first_name,
    last_name,
    email,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Email-Validation--------------*/
    const { validateEmail } = require("../helpers/validation");
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        message: emailValidation.message,
      });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !is_org_user
    ) {
      return res.status(400).json({
        message: "User is not under the correct role of org user!!!",
      });
    }

    /*-------Generating-Password-for-Invited-Staff-Member-------*/
    let generatedPassword = passwordGenerator;

    /*----------------Creating-New-User----------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: generatedPassword,
      password_reset_required: true,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: true,
      is_user: false,
      was_invited: true,
      is_token_used: false,
      email_cofirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);
    const org = await Organization.findOne({
      where:{ org_id: org_id},
    })

    if (user && org) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status----------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*-----------------Generating-Invite-Token---------------*/
      const inviteSecret = auth.invite_secret_key;
      const inviteText = process.env.INVITE_TEXT;
      const token = jwt.sign(
        { inviteData: inviteText },
        Buffer.from(inviteSecret, "base64"),
        {
          algorithm: "HS256",
          expiresIn: "24h", //24 hour period
        }
      );

      const inviteToken = await InviteToken.create({
        user_id: user.user_id,
        invite_first_name: user.first_name,
        invite_last_name: user.last_name,
        invite_email: user.user_email,
        invite_token: token,
        is_token_used: false,
      });
      await inviteToken.save();
      // console.log("Your token --->", token);

      user.invite_token = token;
      await user.save();
      // console.log("Your user --->", user);

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${user.first_name} ${user.last_name}`,
          address: user.user_email,
        },
        subject: `Welcome to Digital Pipeline!`,
        html: `
                  <body style="font-family: Arial; padding: 20px;">
         <p>Hello from Digital Pipeline!</p>
         <p>Your have been invited to ${org.name} as staff!!!</p>
         <p>You will be required to change your password, please use your generated password: ${user.password} to login.
         <p>Click Below to Login</p>
         <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
         <p>Thank you,</p>
         <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
                </body>
      `,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          /*-----------Failed-Server-Response------------*/
          return res.status(500).json({
            message: error.message,
          });
        } else {
          /*-----------Successful-Server-Response------------*/
          return res.status(200).json({
            message: "Invite email sent successfully!!!",
          });
        }
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(500).json({ message: "User creation unsuccessful!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const resetGeneratedPasswordOrg = async (req, res) => {
  const { org_id, user_id } = req.params;
  const {
    password_a,
    password_b,
    mou,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (!!is_meta_admin || !!is_bxdp_admin) {
      return res
        .status(403)
        .json({ message: "User is not a member of the org staff!!!" });
    }

    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { org_id: org_id },
          { user_id: user_id },
          { password_reset_required: true },
          { was_invited: true },
          { is_token_used: false },
        ],
      },
    });

    if (user) {
      /*----------Confirm-Password-Inputs-Match----------*/
      if (password_a !== password_b) {
        return res
          .status(400)
          .json("Passwords do not match, please try again!!!");
      }

      console.log(password_a, password_b);

      /*----------------Encrypt-Password-----------------*/
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      // console.log("Your salt --->", salt);
      const passwordHash = bcrypt.hashSync(password_a, salt);
      // console.log("Your password hash --->", passwordHash);

      /*----------------Changing-User-Data-----------------*/
      user.password = passwordHash;
      user.password_reset_required = false;
      user.is_token_used = true;
      user.mou = mou;
      user.invite_token = null;
      user.is_logged_in = false;

      await user.save();
      // console.log("Your user --->", user);

      /*----------Delete-Invite-Token-----------*/
      const usedToken = await InviteToken.destroy({
        where: {
          [Op.and]: [
            { user_id: user.user_id },
            { invite_email: user.user_email },
          ],
        },
      });

      return res
        .status(200)
        .json({ message: "Password Successfully Changed!!!" });
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

module.exports = {
  inviteMetaAdmin,
  inviteBxdpAdmin,
  resetGeneratedPasswordBxdp,
  inviteOrganization,
  inviteOrgAdmin,
  inviteOrgManager,
  inviteOrgUser,
  resetGeneratedPasswordOrg,
};
