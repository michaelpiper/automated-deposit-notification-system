import dotenv = require('dotenv')
import SMTPTransport = require('nodemailer/lib/smtp-transport')
dotenv.config({
  path: __dirname.concat('/../../../.env')
})
export const env = <T>(key: string, defaultValue?: T | null): T => {
  if (process.env[key] !== undefined) {
    return process.env[key] as T
  }
  if (defaultValue === undefined) {
    throw new Error(`Env variable required ${key}`)
  }
  return defaultValue as T
}
env.int = (key: string, defaultValue: number | null) => env<number>(key, defaultValue)
env.bool = (key: string, defaultValue: boolean | null) => env<boolean>(key, defaultValue)
export const ENV = process.env.NODE_ENV ?? 'development'
export const PROD = ['prod', 'production'].includes(ENV)
export const QUEUE_PREFIX = env<string>('QUEUE_PREFIX', '')
export const redis = {
  host: env<string>('REDIS_HOST', '127.0.0.1'),
  port: env.int('REDIS_PORT', 6379),
  username: env<string>('REDIS_USER', null),
  password: env<string>('REDIS_PASS', null),
  db: env.int('REDIS_DB', null),
  url: env('REDIS_URL', null)
}
export const APP_NAME = 'AUTOMATED-DEPOSIT-NOTIFICATION-SYSTEM'
export const MONGO_CONNECTION_URI = env<string>('MONGO_CONNECTION_URI', null)
export const EmailConfig = Object.freeze({
  options: {
    host: env<string>('MAIL_HOST', null),
    port: env.int('MAIL_PORT', null),
    secure: env.bool('MAIL_SECURE', true),
    auth: {
      type: 'login',
      user: env<string>('MAIL_USER_NAME', null),
      pass: env<string>('MAIL_USER_PASS', null)
    },
    tls: {
      rejectUnauthorized: env.bool('MAIL_REJECT_UNAUTHORIZED', true)
    },
    requireTLS: env.bool('MAIL_REQUIRE_TLS', true),
    connectionTimeout: env.int('MAIL_CONNECTION_TIMEOUT', 1),
    replyTo: env<string>('MAIL_REPLY_TO', null),
    from: env<string>('MAIL_FROM', null)
  } satisfies SMTPTransport.Options,
  settings: {
    defaultFrom: env<string>('MAIL_FROM', null),
    defaultReplyTo: env<string>('MAIL_REPLY_TO', null)
  }
})
export const App = Object.freeze({
  ENV,
  PROD,
  WALLET_PORT: process.env.WALLET_PORT ?? 3000,
  API_PORT: process.env.API_PORT ?? 3001,
  IDP_PORT: process.env.IDP_PORT ?? 3002,
  AUTH_USER: process.env.AUTH_USER ?? 'username',
  AUTH_PASS: process.env.AUTH_PASS ?? 'password',
  get API_BASE_URL () {
    return `http://localhost:${this.API_PORT}`
  },
  get IDP_BASE_URL () {
    return `http://localhost:${this.IDP_PORT}`
  },
  get WALLET_BASE_URL () {
    return `http://localhost:${this.WALLET_PORT}`
  }
})
