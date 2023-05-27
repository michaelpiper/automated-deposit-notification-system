/* eslint-disable @typescript-eslint/no-misused-promises */
'use strict'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from '../user/user.route'
import { errorHandler, notFoundHandler } from '../../responses/errorHandler'
// Import Body Parser
const app = express()
// Middleware to parse post data
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser() as any)
app.use(morgan('common'))
app.use('/users', userRoutes)
app.use(errorHandler)
app.use(notFoundHandler)
export default app
