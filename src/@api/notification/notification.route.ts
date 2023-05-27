/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { NotificationController } from './notification.controller'
import { NotificationMiddleware } from './notification.middleware'
const routes = Router()
const controller = new NotificationController()
const middleware = new NotificationMiddleware()
routes.post('/deposit-request', middleware.handleDepositNotificationValidation.bind(middleware), middleware.userExist.bind(middleware), controller.handleDepositNotification.bind(controller))
routes.get('/:notificationId', middleware.handleRetrieveNotificationValidation.bind(middleware), controller.retrieve.bind(controller))

export default routes
