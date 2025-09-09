require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../config/auth");
const { Op } = require("sequelize");
const { transporter } = require("../config/email");
const { User, ResetPasswordToken } = require("../models");

/*----------PASSWORD-CONTROLLERS----------*/

const sendResetLink = async (req, res) => {
  const { email } = req.body;
  try {
    /*----------------Find-User----------------*/
    const user = await User.findOne({ where: { user_email: email } });
    if (user == null) {
      return res
        .status(500)
        .json({ message: "User successfully found!", data: user });
    }
    // /*-----------Expire-any-used-tokens-----------*/
    // try{
    //   const expireToken = await ResetPasswordToken.findOne({
    //     where: { reset_email: user.user_email },
    //   });

    //   // console.log("This was null--->", expireToken);
    //   if (expireToken || expireToken !== null) {
    //     expireToken.is_token_used = true;
    //     await expireToken.save();
    //   }
    // }catch (error) {
    //   return error
    // }
    /*-----------Create-new-reset-token-----------*/
    const resetSecret = auth.reset_secret_key;
    const resetText = process.env.RESET_TEXT;
    const token = jwt.sign(
      { resetData: resetText },
      Buffer.from(resetSecret, "base64"),
      {
        algorithm: "HS256",
        expiresIn: "1h", //1 hour period
      }
    );
    /*----------Create-reset-token-data----------*/
    const resetToken = await ResetPasswordToken.create({
      user_id: user.user_id,
      reset_first_name: user.first_name,
      reset_last_name: user.last_name,
      reset_email: user.user_email,
      reset_token: token,
      is_token_used: false,
    });
    await resetToken.save();
    console.log("your reset token ----->", resetToken);
    /*----------Create-reset-link----------*/
    const encodedToken = encodeURIComponent(token);
    const resetLink = `${process.env.DEV_DOMAIN}/reset_user_password?reset_token=${token}&email=${user.user_email}`;
    
    transporter.sendMail(
      // mail options
      {
        from: {
          name: "bxdp",
          address: "volunteers@theknowledgehouse.org",
        },
        to: {
          name: `${resetToken.reset_first_name} ${resetToken.reset_last_name}`,
          address: resetToken.reset_email,
        },
        subject: "Reset your password",
        html: `<body style="font-family: Arial; padding: 20px;">
              <p>Hello ${resetToken.reset_first_name} ${resetToken.reset_last_name},</p>
              <p>We have recently received a request to the password for the account associated with the following email <b>${resetToken.reset_email}</b>. No changes have been made to your account yet.</p>
              <p>Please click the link below to reset your password:</p>
              <div style="display: flex;justify-content: center;align-items: center;"><a href=${resetLink} target="_blank" style="text-decoration: none;"><button style="cursor:pointer;height: 45px;width: 155px;background-color: #F99D25; border: none; border-radius: 11.4035px;color: #FFFFFF;">Reset password</button><a/></div>
              <p>For your security, this password link expires after 1 hour.</p>
              <p>If you did not request a new password, please ignore this message or send an email to <b><a href="mailto:${process.env.DEV_FROM_EMAIL}" target="_blank" style="text-decoration: none;">${process.env.DEV_FROM_EMAIL}<a/></b> if you have any questions.</p>
              <p>Thank you and take care,</p>
              <p>${resetToken.reset_first_name} ${resetToken.reset_last_name}</p>
              </body>`,
      },
      // callback
      (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.messageId);
        }
      }
    );

    return res.status(200).json({
      message: "Please check your email for the reset password link!",
      reset_password_token: encodedToken,
      data: resetLink,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, reset_token, password_a, password_b } = req.body;
  console.log("your req body ---->", req.body);
  try {
    /*----------Clear-used-Reset-Token----------*/
    const usedToken = await ResetPasswordToken.findOne({
      where: {
        [Op.and]: [{ reset_email: email }, { is_token_used: true }],
      },
    });
    console.log("your used token ----->", usedToken);
    if (usedToken || usedToken !== null) {
      await usedToken.destroy();
    }
    /*--------------Find-reset-token--------------*/
    const user = await User.findOne({ where: { user_email: email } });
    // console.log("user email--->", user.email);
    const token = decodeURIComponent(reset_token);
    // console.log("Token ----->", token);
    const resetToken = await ResetPasswordToken.findOne({
      where: {
        [Op.and]: [{ reset_email: user.user_email }, { reset_token: token }],
      },
    });
    console.log("resetToken ---->", resetToken.reset_token);
    if (resetToken || resetToken !== null) {
      /*----------Compare-password-inputs----------*/
      if (password_a !== password_b) {
        return res.status(404).json("Passwords must match, please try again!");
      }
      /*----------Update-User-password----------*/
      const salt = await bcrypt.genSalt(10);
      // console.log("salt ---->", salt);
      const passwordHash = bcrypt.hashSync(password_a, salt);
      // console.log("passwordHash---->", passwordHash);
      user.password = passwordHash;
      await user.save();
      return res.send({
        message: "User password has been successfully updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const { user_id, old_password, new_password_a, new_password_b } = req.body;
  console.log("your req body ---->", req.body);
  try {
    /*---------------Find-user---------------*/
    const user = await User.findOne({ where: { user_id: user_id } });
    // console.log("user id--->", user.user_id);
    /*--------Check-that-password-match--------*/
    const passwordMatch = bcrypt.compare(old_password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password!" });
    } else if (passwordMatch) {
      /*----------Compare-password-inputs----------*/
      if (new_password_a !== new_password_b) {
        return res.status(404).json("Passwords must match, please try again!");
      }
      /*----------Update-User-password----------*/
      const salt = await bcrypt.genSalt(10);
      // console.log("salt ---->", salt);
      const passwordHash = bcrypt.hashSync(new_password_a, salt);
      // console.log("passwordHash---->", passwordHash);
      user.password = passwordHash;
      await user.save();
      return res.send({
        message: "User password has been successfully updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendResetLink,
  resetPassword,
  changePassword,
};
