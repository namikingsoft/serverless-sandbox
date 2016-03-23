type MaybeError = Error | null | undefined
type Callback = (err: MaybeError, data: Data)=>void

interface Data {
  message: string
}

module.exports = (event: any, callback: Callback) => {
  return callback(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!',
  })
}

