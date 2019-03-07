require('dotenv').config()

const getMFAToken = require('../../lib/mfatoken')
const test = require('tape')
const { isEmpty, not } = require('ramda')

test(`getMFAToken ;)`, async t => {
  t.plan(1)

  getMFAToken({ secret: process.env.SHARED_SECRET })
    .then(mfaToken => t.ok(not(isEmpty(mfaToken))))
    .catch(err => {
      t.equals(err.message, 'failed test')
    })
})
