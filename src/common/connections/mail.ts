import nodemailer from 'nodemailer'
import { EmailConfig } from '../config'
export const mailer = nodemailer.createTransport(EmailConfig.options)
