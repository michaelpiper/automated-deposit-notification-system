/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { TransactionController } from './transaction.controller'
import { TransactionMiddleware } from './transaction.middleware'
const routes = Router()
const controller = new TransactionController()
const middleware = new TransactionMiddleware()
routes.get('/transactions/:userId', middleware.handleRetrieveUserTransactionValidation.bind(middleware), middleware.userExist.bind(middleware), controller.retrieveUserWallet.bind(controller))
routes.get('/transactions/:userId/:walletId', middleware.handleRetrieveUserWalletTransactionValidation.bind(middleware), middleware.userExist.bind(middleware), controller.retrieveUser.bind(controller))

export default routes
