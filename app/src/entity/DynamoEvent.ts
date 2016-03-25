export interface DynamoEvent {
  method: string
  body: any
  id: string
  tableName: string
}

export default DynamoEvent
