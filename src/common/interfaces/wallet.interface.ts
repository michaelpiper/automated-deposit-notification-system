import { type ObjectId } from 'mongodb'
export enum WalletType {
  open = 'open',
  close = 'close'
}
export interface IWalletGroup {
  name: string
  description: string
}
export interface IWallet<T= string | ObjectId | null> {
  id: T
  userId: ObjectId
  value: number
  groupId: ObjectId
  type: WalletType
}
