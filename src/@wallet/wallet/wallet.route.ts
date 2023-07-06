/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { WalletController } from './wallet.controller'
import { WalletMiddleware } from './wallet.middleware'
const routes = Router()
const controller = new WalletController()
const middleware = new WalletMiddleware()
routes.get('/:walletId', middleware.handleRetrieveWalletValidation.bind(middleware), controller.retrieve.bind(controller))
routes.get('/:walletId/balance', middleware.handleRetrieveWalletValidation.bind(middleware), controller.retrieveBalance.bind(controller))
routes.get('/users/:userId', middleware.handleRetrieveUserWalletValidation.bind(middleware), middleware.userExist.bind(middleware), controller.retrieveUser.bind(controller))
routes.get('/users/:userId/balance', middleware.handleRetrieveUserWalletValidation.bind(middleware), middleware.userExist.bind(middleware), controller.retrieveUserBalance.bind(controller))
routes.post('/users/:userId/fund', middleware.handleRetrieveUserWalletValidation.bind(middleware), middleware.userExist.bind(middleware), controller.fundWallet.bind(controller))
export default routes
