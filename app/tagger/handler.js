"use strict";

require('source-map-support').install()

module.exports.handler = function(event, context) {
  require('../lib').tagger(event)
  .then(function(data) { context.succeed(data) })
  .catch(function(err) { context.fail(err) })
}
