import Joi from 'joi'
// import { ObjectId } from 'mongodb'
// .custom((v: any): boolean => ObjectId.isValid(v))
export const handleRetrieveWallet = Joi.object({
  walletId: Joi.string().max(255).required()
})
export const handleRetrieveUserWallet = Joi.object({
  userId: Joi.string().max(255).required()
})
