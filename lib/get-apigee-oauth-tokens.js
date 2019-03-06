const getMFAToken = require("./mfatoken");
const getEdgeOAuth2Tokens = require("./edge-oauth-tokens");
//const deploymentMetadata = require('../deploy-meta.js')
//const { pathOr } = require("ramda");

// const EDGE_ACCOUNT_MFA_ENABLED = pathOr(
//   true,
//   ['common', 'EDGE_ACCOUNT_MFA_ENABLED'],
//   deploymentMetadata
// )

//const TOTP_WINDOW = pathOr(30000, ['common', 'TOTP_WINDOW'], deploymentMetadata)
// const MIN_OTP_VALIDITY = pathOr(
//   10000,
//   ["common", "MIN_OTP_VALIDITY"],
//   deploymentMetadata
// );

// const EDGE_USER_EMAIL = process.env.EDGE_USER_EMAIL;
// const EDGE_USER_PWD = process.env.EDGE_USER_PWD;

module.exports = ({
  mfaEnabled = true,
  totpWindow,
  minOTPValidity,
  user,
  pwd,
  sharedSecret
}) =>
  getMFAToken(mfaEnabled, totpWindow, minOTPValidity, sharedSecret).then(
    MFAToken => {
      return getEdgeOAuth2Tokens(MFAToken, user, pwd);
    }
  );

// return getMFAToken(
//   EDGE_ACCOUNT_MFA_ENABLED,
//   TOTP_WINDOW,
//   MIN_OTP_VALIDITY,
//   process.env.SHARED_SECRET
// ).then(MFAToken => {
//   return getEdgeOAuth2Tokens(MFAToken, EDGE_USER_EMAIL, EDGE_USER_PWD);
// });
