const fetch = require("isomorphic-fetch");

module.exports = ({ mfaToken, email, pwd }) => {
  const tokenBody = mfaToken
    ? `mfa_token=${mfaToken}&username=${email}&password=${pwd}&grant_type=password`
    : `username=${email}&password=${pwd}&grant_type=password`;

  return fetch("https://login.apigee.com/oauth/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: "Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0",
      Accept: "application/json;charset=utf-8"
    },
    method: "POST",
    body: tokenBody
  }).then(res => res.json());
};
