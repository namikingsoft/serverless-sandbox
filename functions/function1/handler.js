'use strict';

module.exports.handler = (event, context) => {
  return context.done(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!'
  });
};
