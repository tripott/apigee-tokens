const fs = require('fs-extra')

fs.remove('./dist')
  .then(() => fs.copy('./index.js', './dist/index.js'))
  .then(() => fs.copy('./lib', './dist/lib'))
  .then(result => console.log('Build process completed SUCCESSFULLY!'))
  .catch(err => {
    console.log('Build process FAILED!')
    console.error(err)
  })
