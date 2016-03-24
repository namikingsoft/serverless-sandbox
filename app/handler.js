require('source-map-support').install()
const lib = require('./lib')

module.exports.handler = (event, context) => {
  lib(event, (err, data) => context.done(err, data))
}
