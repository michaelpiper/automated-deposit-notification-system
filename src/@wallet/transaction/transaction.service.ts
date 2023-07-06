import TransactionModel, { type TransactionDocument } from './transaction.model'
import { type TransactionType } from '../../common/interfaces/transaction.interface'
import InternalServerError from '../../responses/serverErrors/internalServerError.serverError'
import { isValidObjectId } from 'mongoose'
import { ErrorCode, ErrorDescription } from '../../common/constants'
import { ObjectId } from 'mongodb'
import BadRequest from '../../responses/clientErrors/badRequest.clientError'
// import * as uuid from 'uuid'
export class TransactionService {
  async create (originId: string, destinationId: string, reference: string, type: TransactionType, amount: number = 0): Promise<TransactionDocument> {
    const isExist = await this.findOneByReference(reference) != null
    if (isExist) {
      throw new BadRequest(ErrorCode.INVALID_INPUT, ErrorDescription.INVALID_INPUT, 'Reference with this request already exist')
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await TransactionModel.create({
      type,
      originId: new ObjectId(originId),
      destinationId: new ObjectId(destinationId),
      amount
    })
  }

  findOneByReference (reference: string) {
    // if (!uuid.validate(reference)) {
    //   throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid UUID for transaction reference')
    // }
    return TransactionModel.findOne({
      txRef: reference
    })
  }

  findOneById (id: string) {
    if (!isValidObjectId(id)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return TransactionModel.findOne({
      _id: new ObjectId(id)
    })
  }

  findByOrigin (originId: string) {
    if (!isValidObjectId(originId)) {
      throw new InternalServerError(ErrorCode.INVALID_PAYLOAD, ErrorDescription.INVALID_PAYLOAD, 'Please provide a valid ObjectID')
    }
    return TransactionModel.findOne({
      originId: new ObjectId(originId)
    })
  }
}
