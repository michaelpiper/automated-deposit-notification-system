/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express = require('express')
import walletRoutes from '../wallet/wallet.route'
import transactionRoutes from '../transaction/transaction.route'
import cookieParser from 'cookie-parser'
import morgan = require('morgan')
import { errorHandler, notFoundHandler } from '../../responses/errorHandler'
// Import Body Parser
const app = express()
// Middleware to parse post data
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser() as any)
app.use(morgan('common'))
app.use('/transactions', transactionRoutes)
app.use('/wallets', walletRoutes)

app.use(errorHandler)
app.use(notFoundHandler)
export default app
