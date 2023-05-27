/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserController from './user.controller'
import UserMiddleware from './user.middleware'
const routes = Router()
const controller = new UserController()
const middleware = new UserMiddleware()
routes.get('', controller.list.bind(controller))
routes.get('/:userId', middleware.handleRetrieveUserValidation.bind(middleware), controller.retrieve.bind(controller))
routes.post('', middleware.handleCreateUserValidation.bind(middleware), controller.create.bind(controller))
export default routes
