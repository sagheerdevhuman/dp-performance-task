require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const { transporter } = require("../config/email");
const { passwordGenerator } = require("../config/passwordGenerator");
const { User, Organization, InviteToken } = require("../models");
const { IoTEventsData } = require("aws-sdk");

/*-------------AUTHENTICATION-CONTROLLERS-------------*/

/*-------------META-ADMIN-SIGN-UP-------------*/
const signUpMetaAdmin = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    is_user,
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
      !!was_invited ||
      !is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(403).json({
        message: "User is not under the correct role of meta admin!!!",
      });
    }

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);
    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*-------------Create-New-Meta-Admin---------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: false,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: is_meta_admin,
      is_bxdp_admin: is_bxdp_admin,
      is_org_admin: is_org_admin,
      is_org_manager: is_org_manager,
      is_org_user: is_org_user,
      is_user: false,
      was_invited: was_invited,
      email_cofirmed:true,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status--------*/
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

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${first_name} ${last_name}`,
          address: user.user_email,
        },
        subject: "Digital Pipeline Registration!!!",
        html: `<body style="font-family: Arial; padding: 20px;">
                <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>
                <p>Please click the link below to login:</p>
                <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>

                <p>Please feel free to send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> with any questions.</p>
                <p>Thank you and Welcome,</p>
                <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
              </body>`,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          console.log(error, null);
        } else {
          return res.status(200).json({
            message: "Email sent to registered meta admin!!!",
          });
        }
      });

      /*-----------Successful-Server-Response------------*/
      return res.status(200).json({
        message: "Meta admin was registered successfully!!!",
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "Meta admin reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-------------BXDP-ADMIN-SIGN-UP-------------*/
const signUpBxdpAdmin = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    password_reset_required,
    mou,
    is_approved,
    is_active,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    is_user,
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
      !!was_invited ||
      !!is_meta_admin ||
      !is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(403).json({
        message: "User is not under the correct role of bxdp admin!!!",
      });
    }

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);
    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*-------------Create-New-Bxdp-Admin---------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: password_reset_required,
      mou: mou,
      is_approved: is_approved,
      is_active: is_active,
      is_meta_admin: is_meta_admin,
      is_bxdp_admin: is_bxdp_admin,
      is_org_admin: is_org_admin,
      is_org_manager: is_org_manager,
      is_org_user: is_org_user,
      is_user: false,
      was_invited: was_invited,
      email_cofirmed:true,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status--------*/
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

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/approval_page?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${first_name} ${last_name}`,
          address: user.user_email,
        },
        subject: "TDigital Pipeline Registration!!!",
        html: `<body style="font-family: Arial; padding: 20px;">
                <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>
                <p>Please click the link below to login:</p>
                <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>

                <p>Please feel free to send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> with any questions.</p>
                <p>Thank you and Welcome,</p>
                <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
              </body>`,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          console.log(error, null);
        } else {
          return res.status(200).json({
            message: "Email sent to registered BXDP admin!!!",
          });
        }
      });

      /*-----------Successful-Server-Response------------*/
      return res.status(200).json({
        message: "BXDP admin was registered successfully!!!",
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "BXDP admin reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-------------ORGANIZATION-SIGN-UP-----------*/
const signUpOrganization = async (req, res) => {
  const {
    name,
    info_email,
    password_a,
    password_b,
    description,
    website,
    phone,
    address_a,
    address_b,
    zipcode,
    logo_url,
    banner_url,
    user_id,
  } = req.body;
  // console.log("your req --->", req.body);
  try {
    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*-----------------Get-Full-Address-----------------*/
    let fullAddress;
    if (!address_b || address_b == "") {
      fullAddress = `${address_a}`;
    } else {
      fullAddress = `${address_a} ${address_b}`;
    }
    // console.log("Your address --->", fullAddress);

    /*-------------Create-New-Organization-------------*/
    const org = await Organization.create({
      name: name,
      info_email: info_email,
      description: description,
      website: website,
      phone: phone,
      address: fullAddress,
      zipcode: zipcode,
      mou: true,
      is_approved: false,
      is_active: true,
      was_invited: false,
      banner_url:banner_url,
      logo_url: logo_url,
    });
    await org.save();
    // console.log("Your org --->", org);

    if (org) {

      const user = await User.findOne({
        where: { user_id: user_id },
      });
      if (user) {
        user.org_id= org.org_id,
        user.email_cofirmed=true,
        await user.save();

        const inviteLink = `${process.env.DEV_DOMAIN}/login`;

        const welcomeMessage = {
          from: {
            name: `${process.env.DEV_FROM_EMAIL_NAME}`,
            address: process.env.DEV_FROM_EMAIL,
          },
          to: {
            name: `${user.first_name} ${user.last_name}`,
            address: user.user_email,
          },
          subject: `Welcome to  Digital Pipeline!`,
          html: `<body style="font-family: Arial; padding: 20px;">
          <p>Hey ${user.first_name}/p>
          <p>Thank you for registering ${org.name} on Digital Pipeline! We’ve successfully received your application, and your account is now pending approval by our team.</p>
          <p>Login to Veiw your dashboard by clicking the button below:</p>
          <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
          <p>If the button above doesn’t work, copy and paste this link into your browser:<br>${inviteLink}</p>
          <p>If you didn’t register on Digital Pipeline, please ignore this message or contact our support team at info@theknowledgehouse.org.</p>


          <P>Thank you,</p>  
          <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
          <p>Digital Pipeline</p>
          </body>`,
        };

        transporter.sendMail(welcomeMessage, function (error, success) {
          if (error) {
            console.log(error, null);
          } else {
            return res.status(200).json({
              message: "Email sent to registered user!!!",
            });
          }
        });
        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          org_id: org.org_id,
          message: "Orgnanization was registered successfully!!!",
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "Orgnanization reigstration failed!!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/*-------------ORG-ADMIN-SIGN-UP--------------*/
const signUpOrgAdmin = async (req, res) => {
  const {
    org_id,
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    password_reset_required,
    mou,
    is_approved,
    is_active,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    is_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (
      !!was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(403).json({
        message: "User is not under the correct role of org admin!!!",
      });
    }

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);
    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*-------------Create-New-Org-Admin---------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: password_reset_required,
      mou: mou,
      is_approved: is_approved,
      is_active: is_active,
      is_meta_admin: is_meta_admin,
      is_bxdp_admin: is_bxdp_admin,
      is_org_admin: is_org_admin,
      is_org_manager: is_org_manager,
      is_org_user: is_org_user,
      is_user: false,
      was_invited: was_invited,
      email_cofirmed:true,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (!!user.is_org_admin) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status--------*/
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

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${first_name} ${last_name}`,
          address: user.user_email,
        },
        subject: "Digital Pipeline Registration!!!",
        html: `<body style="font-family: Arial; padding: 20px;">
                <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>
                <p>Please click the link below to login:</p>
                <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
                
                <p>Please feel free to send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> with any questions.</p>
                <p>Thank you and Welcome,</p>
                <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
              </body>`,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          console.log(error, null);
        } else {
          return res.status(200).json({
            message: "Email sent to registered org admin!!!",
          });
        }
      });

      /*-----------Successful-Server-Response------------*/
      return res.status(200).json({
        message: "Org admin was registered successfully!!!",
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "Org admin reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-------------ORG-MANAGER-SIGN-UP--------------*/
const signUpOrgManager = async (req, res) => {
  const {
    org_id,
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    password_reset_required,
    mou,
    is_approved,
    is_active,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    is_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (
      !!was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !is_org_manager ||
      !!is_org_user
    ) {
      return res.status(403).json({
        message: "User is not under the correct role of org manager!!!",
      });
    }

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);

    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*-------------Create-New-Org-Manager---------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: password_reset_required,
      mou: mou,
      is_approved: is_approved,
      is_active: is_active,
      is_meta_admin: is_meta_admin,
      is_bxdp_admin: is_bxdp_admin,
      is_org_admin: is_org_admin,
      is_org_manager: is_org_manager,
      is_org_user: is_org_user,
      is_user: false,
      was_invited: was_invited,
      email_cofirmed:true,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status--------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*--------------Create-new-invite-token--------------*/
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

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${first_name} ${last_name}`,
          address: user.user_email,
        },
        subject: "Digital Pipeline Registration!!!",
        html: `<body style="font-family: Arial; padding: 20px;">
                <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>
                <p>Please click the link below to login:</p>
                <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
                
                <p>Please feel free to send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> with any questions.</p>
                <p>Thank you and Welcome,</p>
                <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
              </body>`,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          console.log(error, null);
        } else {
          return res.status(200).json({
            message: "Email sent to registered org manager!!!",
          });
        }
      });

      /*-----------Successful-Server-Response------------*/
      return res.status(200).json({
        message: "Org manager was registered successfully!!!",
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "Org manager reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-------------ORG-USER-SIGN-UP--------------*/
const signUpOrgUser = async (req, res) => {
  const {
    org_id,
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    password_reset_required,
    mou,
    is_approved,
    is_active,
    is_meta_admin,
    is_bxdp_admin,
    is_org_admin,
    is_org_manager,
    is_org_user,
    is_user,
    was_invited,
  } = req.body;
  try {
    /*-------------Failed-Server-Response--------------*/
    if (
      !!was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !is_org_user
    ) {
      return res
        .status(403)
        .json({ message: "User is not under the correct role of org user!!!" });
    }

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);

    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*----------------Create-Org-User----------------*/
    const user = await User.create({
      org_id: org_id,
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: password_reset_required,
      mou: mou,
      is_approved: is_approved,
      is_active: is_active,
      is_meta_admin: is_meta_admin,
      is_bxdp_admin: is_bxdp_admin,
      is_org_admin: is_org_admin,
      is_org_manager: is_org_manager,
      is_org_user: is_org_user,
      is_user: false,
      was_invited: was_invited,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    await user.save();
    // console.log("Your user --->", user);

    if (user) {
      /*--------Checking-for-Generated-Invite-Tokens-&-Token-Status--------*/
      const expireToken = await InviteToken.findOne({
        where: { invite_email: user.user_email },
      });

      if (expireToken || expireToken !== null) {
        expireToken.is_token_used = true;
        await expireToken.save();
      }

      /*--------------Create-new-invite-token--------------*/
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

      /*------------Drafting-Welcome-Email-&-Link------------*/
      const encodedToken = encodeURIComponent(token);
      const inviteLink = `${process.env.DEV_DOMAIN}/login?invite_token=${encodedToken}`;

      const welcomeMessage = {
        from: {
          name: `${process.env.DEV_FROM_EMAIL_NAME}`,
          address: process.env.DEV_FROM_EMAIL,
        },
        to: {
          name: `${first_name} ${last_name}`,
          address: user.user_email,
        },
        subject: "Digital Pipeline Registration!!!",
        html: `<body style="font-family: Arial; padding: 20px;">
                <p>Hello ${user.first_name} ${user.last_name} from Digital Pipeline!</p>
                <p>Please click the link below to login:</p>
                <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
                
                <p>Please feel free to send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> with any questions.</p>
                <p>Thank you and Welcome,</p>
                <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
              </body>`,
      };

      /*------------Sending-Welcome-Email------------*/
      transporter.sendMail(welcomeMessage, function (error, success) {
        if (error) {
          console.log(error, null);
        } else {
          return res.status(200).json({
            message: "Email sent to registered org user!!!",
          });
        }
      });

      /*-----------Successful-Server-Response------------*/
      return res.status(200).json({
        message: "Org user was registered successfully!!!",
      });
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(400)
        .json({ message: "Org user reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

/*-------------WEBSITE-USER-SIGN-UP--------------*/
const signUpUser = async (req, res) => {
  const { 
    profile_url,
    first_name,
    last_name,
    email,
    password_a,
    password_b,
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

    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    if (
      !!was_invited ||
      !!is_meta_admin ||
      !!is_bxdp_admin ||
      !!is_org_admin ||
      !!is_org_manager ||
      !!is_org_user
    ) {
      return res.status(403).json({ message: "User registration failed!!!" });
    }


    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);
    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);
console.log("Your profile_url --->", profile_url);
    /*--------------Create-Website-User----------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: false,
      profile_img:profile_url,
      profile_cofirmed:false,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: false,
      is_org_manager: false,
      is_org_user: false,
      is_user: true,
      was_invited: false,
      email_cofirmed:false,
    });

    // console.log("Your user --->", user);

    /*------------Send-Welcome-Email------------*/
    

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

      if(inviteToken){
        const inviteLink = `${process.env.DEV_DOMAIN}/confirm_email?invite_token=${token}&user=${user.user_id}&type=user`;
        user.invite_token = token;
        await user.save();
         console.log("Your user --->", user);
         console.log("Your user --->", inviteLink);
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
          html: `<body style="font-family: Arial; padding: 20px;">
          <p>Hello ${user.first_name}</p>
          <p>Thank you for signing up for Digital Pipeline! To complete your registration and ensure we have the right email address, please confirm your account by clicking the button below:</p>
          <p>${user.user_email}</p>
          <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
          <p>If the button above doesn’t work, copy and paste this link into your browser:<br>${inviteLink}</p>
          <p>If you didn’t sign up for The Digital Pipeline, please ignore this message or contact our support team at info@theknowledgehouse.org.</p>


          <P>Thank you,</p>  
          <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
          <p>Digital Pipeline</p>
          
          </body>`,
        };
        
        await transporter.verify();
        console.log("Email verified successfully");
        transporter.sendMail(welcomeMessage, function (error, success) {
          if (error) {
            console.log(error, null);
          } else {
            return res.status(200).json({
              user:user,
              message: "Email sent to registered user!!!",
            });
          }
      });

        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User was registered successfully!!!",
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(400).json({ message: "User reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};


/*-------------WEBSITE-USER-SIGN-UP--------------*/
const signUpNewOrgUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password_a,
    password_b,
    // profile_img,
  } = req.body;
  try {
    /*----------Confirm-Password-Inputs-Match----------*/
    if (password_a !== password_b) {
      return res
        .status(400)
        .json({ message: "Passwords do not match, please try again!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    

    /*----------------Encrypt-Password-----------------*/
    const salt = await bcrypt.genSalt(10);
    // console.log("Your salt --->", salt);
    const passwordHash = bcrypt.hashSync(password_a, salt);
    // console.log("Your password hash --->", passwordHash);

    /*--------------Create-Website-User----------------*/
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_email: email,
      password: passwordHash,
      password_reset_required: false,
      // profile_img:profile_img,
      mou: true,
      is_approved: true,
      is_active: true,
      is_meta_admin: false,
      is_bxdp_admin: false,
      is_org_admin: true,
      is_org_manager: false,
      is_org_user: false,
      is_user: false,
      was_invited: false,
      email_cofirmed:false,
      profile_cofirmed:true,
      settings_confirmed:true,
    });

    // console.log("Your user --->", user);

    /*------------Send-Welcome-Email------------*/
    

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
      console.log("Your token --->", inviteToken);

      const type = "org"

      if(inviteToken){
        const inviteLink = `${process.env.DEV_DOMAIN}/confirm_email?invite_token=${token}&user=${user.user_id}&type=${type}`;
        user.invite_token = token;
        await user.save();
         console.log("Your user --->", user);
         console.log("Your user --->", inviteLink);
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
          html: `<body style="font-family: Arial; padding: 20px;">
          <p>Hello ${user.first_name}</p>
          <p>Thank you for signing up for Digital Pipeline! To complete your registration and ensure we have the right email address, please confirm your account by clicking the button below:</p>
          <p>${user.user_email}</p>
          <div style="display: flex;justify-content: center;align-items: center;"><a href=${inviteLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Login</button><a/></div>
          <p>If the button above doesn’t work, copy and paste this link into your browser:<br>${inviteLink}</p>
          <p>If you didn’t sign up for The Digital Pipeline, please ignore this message or contact our support team at info@theknowledgehouse.org.</p>


          <P>Thank you,</p>  
          <p>${process.env.DEV_FROM_EMAIL_NAME}</p>
          <p>Digital Pipeline</p>
          
          </body>`,
        };
       
        await transporter.sendMail(welcomeMessage, function (error, success) {
          if (error) {
            console.log(error, null);
          } else {
            return res.status(200).json({
              message: "Email sent to registered user!!!",
            });
          }
        });

        /*-----------Successful-Server-Response------------*/
        return res.status(200).json({
          message: "User was registered successfully!!!",
        });
      }
    } else {
      /*-------------Failed-Server-Response--------------*/
      return res.status(400).json({ message: "User reigstration failed!!!" });
    }
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};



/*-------------USER-LOGIN-------------*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    /*----------------Look-for-User----------------*/
    const user = await User.findOne({ where: { user_email: email },
      include: "profile" });
    // console.log("Your user --->", user);

    if (!user) {
      /*-------------Failed-Server-Response--------------*/
      return res
        .status(404)
        .json({ message: "An account with that email is not found!!!" });
    }

    /*----------Confirm-Passwords-Match----------*/
    let passwordMatch;
    if (user.was_invited && user.password_reset_required) {
      /*----------Compare-Unencrypted-Password-With-Input-----------*/
      if (password == user.password) {
        passwordMatch = true;
      }
    } else {
      /*----------Compare-Encrypted-Password-With-Input-----------*/
      passwordMatch = await bcrypt.compare(password, user.password);
      console.log(password);
      console.log(user.password);
      console.log(passwordMatch);
    }

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password!!!" });
    }
    // console.log("Your password matches --->", passwordMatch);

    /*--------Check-That-User-is-Approved--------*/
    if (user.is_approved === false) {
      return res.status(403).json({ message: "You are not approved yet!!!" });
    }
    // console.log("Your status --->", user.is_approved);

    if (passwordMatch) {
      user.is_logged_in = true;
      await user.save();
    }

    /*---------------Login-the-User---------------*/
    const secret = auth.secret_key;
    const accessToken = jwt.sign({ user_id: user.user_id }, secret, {
      expiresIn: "12h",
      // 12 hr expiration period
    });

    /*-----------Successful-Server-Response------------*/
    return res.status(200).json({
      user_id: user.user_id,
      org_id: user.org_id,
      first_name: user.first_name,
      last_name: user.last_name,
      img:user,
      profile_cofirmed:user.profile_cofirmed,
      zipcode: user.zipcode,
      password_reset_required: user.password_reset_required,
      is_approved: user.is_approved,
      is_active: user.is_active,
      profile_img:user.profile_img,
      is_logged_in: user.is_logged_in,
      is_meta_admin: user.is_meta_admin,
      is_bxdp_admin: user.is_bxdp_admin,
      is_org_admin: user.is_org_admin,
      is_org_manager: user.is_org_manager,
      is_org_user: user.is_org_user,
      is_user: user.is_user,
      was_invited: user.was_invited,
      invite_token: user.invite_token,
      access_token: accessToken,
      email_cofirmed:user.email_cofirmed,
      profile:user.profile,
    });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await User.findOne({ where: { user_id: user_id }, include: "profile" });
    // console.log("Your user --->", user);

    if (user) {
      user.is_logged_in = false;
      await user.save();
      return res.status(200).json({ message: "User is logged out" });
    }

    return res
      .status(404)
      .json({ message: "An account with that id is not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};




/*--------------Verify-Email------------------*/
const verifyEmail = async (req, res) => {
  const { user_id } = req.body;

  try {
    /*-------------Retreive-User-------------*/
    const user = await User.findOne({
      where: { user_id: user_id }, 
    });

    /*-------------Approve-Organization-------------*/
    if (user) {
      user.email_cofirmed = true;
      await user.save();
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
    if (!user.email_cofirmed) {
      return res
        .status(409)
        .json({ message: "Organization is already approved!!!" });
    }

    /*-------------Failed-Server-Response--------------*/
    return res
      .status(404)
      .json({ message: "Organization with that id not found!!!" });
  } catch (error) {
    /*-------------Failed-Server-Response--------------*/
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  signUpMetaAdmin,
  signUpBxdpAdmin,
  signUpOrganization,
  signUpOrgAdmin,
  signUpOrgManager,
  signUpOrgUser,
  signUpUser,
  loginUser,
  logoutUser,
  signUpNewOrgUser,
  verifyEmail,
};
