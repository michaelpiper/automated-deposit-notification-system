import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { UserType } from './user.model'
export const handleRetrieveUser = Joi.object({
  userId: Joi.string().custom((v: any): boolean => ObjectId.isValid(v)).required()
})
export const handleCreateUser = Joi.object({
  name: Joi.string().max(255).required(),
  username: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  phone: Joi.string().regex(/[0-9]+/).min(7).max(11).required(),
  type: Joi.string().valid(UserType.customer).required(),
  password: Joi.string().min(5).max(255).required()
})
