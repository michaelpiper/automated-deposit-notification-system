/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express = require('express')
import notificationRoutes from '../notification/notification.route'
import cookieParser from 'cookie-parser'
import morgan = require('morgan')
import { errorHandler, notFoundHandler } from '../../responses/errorHandler'
import kue from 'kue'
// Import Body Parser
const app = express()
// Middleware to parse post data
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser() as any)
app.use(morgan('common'))
app.use('/notifications', notificationRoutes)
app.use('/queue', kue.app)
app.use(errorHandler)
app.use(notFoundHandler)

export default app
