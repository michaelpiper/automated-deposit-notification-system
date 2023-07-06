import WalletModel, { type WalletDocument } from './wallet.model'
import { WalletType } from '../../common/interfaces/wallet.interface'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'
import { isValidObjectId } from 'mongoose'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import { ObjectId } from 'mongodb'
import { type WalletFundingReqDto } from './wallet.dto'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
import { TransactionService } from '../transaction/transaction.service'
import { TransactionType } from '../../common/interfaces/transaction.interface'
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
    if (!isValidObjectId(id)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return WalletModel.findOne({
      _id: new ObjectId(id)
    })
  }

  findOneByUserId (userId: string) {
    if (!isValidObjectId(userId)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return WalletModel.findOne({
      userId: new ObjectId(userId)
    })
  }

  async fundWallet (dto: WalletFundingReqDto) {
    const transactionService = new TransactionService()
    console.log(dto)
    const wallet = await WalletModel.findOne({
      userId: new ObjectId(dto.userId),
      _id: new ObjectId(dto.walletId)
    })
    if (wallet == null) {
      throw new BadRequest(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'Wallet with this request doesn\'t exist')
    }
    const transaction = await transactionService.findOneByReference(dto.txRef)
    if (transaction !== null) {
      throw new BadRequest(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'Transaction with this request already exist')
    }
    await WalletModel.updateOne({
      _id: wallet.id
    },
    {

      value: wallet.value + dto.amount

    })
    try {
      await transactionService.create(
        wallet.id,
        wallet.id,
        dto.txRef,
        TransactionType.cr,
        dto.amount
      )
    } catch (error) {
      await WalletModel.updateOne({
        _id: new ObjectId(dto.walletId)
      },
      {

        value: wallet.value - dto.amount

      })
      throw error
    }

    return await this.findOneById(wallet.id)
  }
}
