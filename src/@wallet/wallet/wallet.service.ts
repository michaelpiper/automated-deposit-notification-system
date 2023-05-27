import WalletModel, { type WalletDocument } from './wallet.model'
import { WalletType } from '../../common/interfaces/wallet.interface'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'
import { isValidObjectId } from 'mongoose'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import { ObjectId } from 'mongodb'
export class WalletService {
  async findOrCreate (userId: string, type: WalletType = WalletType.open, groupId: number | null = null, value: number = 0): Promise<WalletDocument> {
    const wallet: WalletDocument | null = await this.findOneById(userId)
    const isExist = wallet != null
    if (isExist) {
      return wallet
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await WalletModel.create({
      type,
      userId: new ObjectId(userId),
      value,
      groupId
    })
  }

  findOneById (id: string) {
    if (!(isValidObjectId(id) === true)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return WalletModel.findOne({
      _id: new ObjectId(id)
    })
  }

  findOneByUserId (userId: string) {
    if (!(isValidObjectId(userId) === true)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return WalletModel.findOne({
      userId: new ObjectId(userId)
    })
  }
}
