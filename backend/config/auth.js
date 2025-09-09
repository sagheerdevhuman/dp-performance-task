require("dotenv").config();

module.exports = {
  secret_key:process.env.DB_KEY,
  reset_secret_key:process.env.RESET_KEY,
  invite_secret_key:process.env.INVITE_KEY,
}
