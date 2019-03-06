require("dotenv").config();

const getMFAToken = require("../../lib/mfatoken");
const getEdgeOAuth2Tokens = require("../../lib/edge-oauth-tokens");
const test = require("tape");
const { isEmpty, not } = require("ramda");
const hasKeys = require("../lib/has-keys");

test(`getMFAToken then Apigee Edge OAuth Tokens ;)`, async t => {
  t.plan(2);

  let mfa = null;

  getMFAToken({ secret: process.env.SHARED_SECRET })
    .then(mfaToken => {
      mfa = mfaToken;

      return getEdgeOAuth2Tokens({
        mfaToken,
        email: process.env.EDGE_USER_EMAIL,
        pwd: process.env.EDGE_USER_PWD
      });
    })
    .then(oauthTokens => {
      t.ok(not(isEmpty(mfa)));
      t.equals(
        hasKeys(oauthTokens, [
          "access_token",
          "token_type",
          "refresh_token",
          "expires_in",
          "scope",
          "jti"
        ]),
        true
      );
    })
    .catch(err => {
      t.equals(err.message, "failed test");
    });
});
