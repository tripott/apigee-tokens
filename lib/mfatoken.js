/***********************
 Acquire a Time-based One Time Password TOTP
  Multi Factor Authentication (MFA) token

 Promised based CLI alternative to Google Authenticator or similar mobile apps.
 Helpful for use with CI bots and automation tools.
 NOTES
  Ensuring OTP is valid for next minOTPValidity millisecs
  helps in subsequent usage of OTP
******************************************************************************/

const totp = require("totp-generator");

module.exports = ({
  mfaEnabled = true,
  totpWindow = 30000,
  minOTPValidity = 10000,
  secret = null
}) => {
  // if EDGE account not multi-factor/two factor enabled (MFA / 2FA)
  if (mfaEnabled === "false") {
    return new Promise(function(resolve, reject) {
      resolve(null);
    });
  }

  const generateOneTimePwd = () => totp(secret || "");

  const now = new Date().getTime();
  const delta = now % totpWindow;
  const isOneTimePwdStillValid = delta < totpWindow - minOTPValidity;

  if (isOneTimePwdStillValid) {
    return new Promise(function(resolve, reject) {
      resolve(generateOneTimePwd());
    });
  } else {
    const waitTime = totpWindow - delta;
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(generateOneTimePwd());
      }, waitTime);
    });
  }
};
