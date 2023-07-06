import { Schema, type HydratedDocument } from 'mongoose'
import { MongooseAdapter } from '../../common/connections'
import { TransactionType, type ITransaction } from '../../common/interfaces/transaction.interface'
export { type ITransaction } from '../../common/interfaces/transaction.interface'

export const TransactionSchema = new Schema<ITransaction>({
  destinationId: Schema.Types.ObjectId,
  originId: Schema.Types.ObjectId,
  amount: Number,
  type: {
    type: String,
    enum: Object.values(TransactionType),
    required: true
  },
  txRef: {
    type: String,
    unique: true
  }
})
export const TransactionModel = MongooseAdapter.connection.model<ITransaction>('Transaction', TransactionSchema)
export type TransactionDocument = HydratedDocument<ITransaction>
export default TransactionModel
