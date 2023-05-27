import Joi from 'joi'
import { NotificationType } from './notification.model'

export const handleDepositNotification = Joi.object({
  reference: Joi.string().min(3).max(255).required(),
  userId: Joi.string().max(255).required(),
  amount: Joi.number().required(),
  notificationType: Joi.string().valid(...Object.values(NotificationType)).required()
})

export const handleRetrieveNotification = Joi.object({
  notificationId: Joi.string().min(3).max(255).required()
})
