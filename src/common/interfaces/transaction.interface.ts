import { type ObjectId } from 'mongodb'
export enum TransactionType {
  cr = 'cr',
  dr = 'dr'
}

export interface ITransaction<T= string | ObjectId | null> {
  id: T
  originId: ObjectId
  destinationId: ObjectId
  amount: number
  txRef: string
  type: TransactionType
}
