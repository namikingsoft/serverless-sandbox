import * as Promise from 'bluebird'
import {assign} from 'lodash'
import Promisifier from './utils/Promisifier'
import DynamoEvent from './entity/DynamoEvent'

export function dynamo(event: DynamoEvent): Promise<any> {
  const aws = require('aws-sdk')
  return new Promise<any>((resolve, reject) => {
    const promisifier = new Promisifier(resolve, reject)
    const dynamo = new aws.DynamoDB()
    const payload = assign(event.body, {TableName: event.tableName})
    switch (event.method) {
    case 'POST':
      dynamo.putItem(payload, promisifier.callback)
      break
    default:
      resolve(event)
      break
    }
  })
}
