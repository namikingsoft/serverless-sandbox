"use strict";

require('source-map-support').install()

module.exports.handler = function(event, context) {
  require('../lib')(event, function(err, data) {
    return context.done(err, data)
  })
}
