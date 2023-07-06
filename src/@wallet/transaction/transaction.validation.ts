import Joi from 'joi'
// import { ObjectId } from 'mongodb'
// .custom((v: any): boolean => ObjectId.isValid(v))
export const handleRetrieveUserTransaction = Joi.object({
  userId: Joi.string().max(255).required()
})
export const handleRetrieveUserWalletTransaction = Joi.object({
  userId: Joi.string().max(255).required(),
  walletId: Joi.string().max(255).required()
})
