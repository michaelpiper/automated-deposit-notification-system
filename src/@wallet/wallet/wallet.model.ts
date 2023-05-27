import { Schema, type HydratedDocument } from 'mongoose'
import { MongooseAdapter } from '../../common/connections'
import { WalletType, type IWallet } from '../../common/interfaces/wallet.interface'
export { WalletType, type IWallet } from '../../common/interfaces/wallet.interface'

export const WalletSchema = new Schema<IWallet>({
  userId: Schema.Types.ObjectId,
  value: Number,
  groupId: Schema.Types.ObjectId,
  type: {
    type: String,
    values: Object.values(WalletType)
  }
})
export const WalletModel = MongooseAdapter.connection.model<IWallet>('Wallet', WalletSchema)
export type WalletDocument = HydratedDocument<IWallet>
export default WalletModel
