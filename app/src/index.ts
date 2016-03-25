import * as fs from 'fs'
import * as Promise from 'bluebird'
import {assign} from 'lodash'
import Promisifier from './utils/Promisifier'
import DynamoEvent from './entity/DynamoEvent'
import TaggerEvent from './entity/TaggerEvent'

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

export function tagger(event: TaggerEvent): Promise<any> {
  const libdir = '../vendor/rakutenma'
  const RakutenMA = require(`${libdir}/rakutenma`)
  const model = JSON.parse(
    fs.readFileSync(`${__dirname}/${libdir}/model.json`).toString()
  )
  const rma = new RakutenMA(model)
  rma.featset = RakutenMA.default_featset_ja
  rma.hash_func = RakutenMA.create_hash_func(15)
  const text = decodeURIComponent(event.text || "")
  const tokens = rma.tokenize(text)
  return Promise.resolve(tokens)
}
