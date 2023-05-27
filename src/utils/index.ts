import { App, PROD } from '../common/config'
import compare = require('tsscmp')
import crypto = require('crypto')
import { type AxiosResponse } from 'axios'

export const debug = (sOrf: (() => void) | string, f?: (logger: Console) => void): void => {
  if (!PROD) {
    if (typeof sOrf === 'string') {
      console.log(`======================== ${sOrf} ========================`)
      if (f !== null && f !== undefined) f(console)
      return
    }
    sOrf()
  }
}
debug.error = (sOrf: (() => void) | string, f?: (logger: Console) => void): void => {
  if (!PROD) {
    if (typeof sOrf === 'string') {
      console.error(`======================== ${sOrf} ========================`)
      if (f !== null && f !== undefined) f(console)
      return
    }
    sOrf()
  }
}
debug.warn = (sOrf: () => void | string, f?: (logger: Console) => void): void => {
  if (!PROD) {
    if (typeof sOrf === 'string') {
      console.warn(`======================== ${sOrf as string} ========================`)
      if (f !== null && f !== undefined) f(console)
      return
    }
    sOrf()
  }
}
export const check = (name: string, pass: string): boolean => {
  let valid = true
  valid = compare(name, App.AUTH_USER) && valid
  valid = compare(pass, App.AUTH_PASS) && valid
  return valid
}

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicName = 'YOUR_TOPIC_NAME';
// const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library

/** Sync
 * @return {string}
 * @param {number} length
 * @param {string} chars
 */
const randomString = (length: number, chars: string): string => {
  if (chars === null || chars === undefined || chars.length === 0) {
    throw new Error("Argument 'chars' is undefined")
  }

  const charsLength = chars.length
  if (charsLength > 256) {
    throw new Error(
      "Argument 'chars' should " +
        'not have more than 256 characters' +
        ', otherwise unpredictability will be broken'
    )
  }

  const randomBytes = crypto.randomBytes(length)
  const result = new Array(length)

  let cursor = 0
  for (let i = 0; i < length; i++) {
    cursor += randomBytes[i]
    result[i] = chars[cursor % charsLength]
  }

  return result.join('')
}
export const genRandomBytes = (len = 0): string =>
  randomString(len, 'abcdefghijklmnopqrstuvwxyzABCDEFG' +
  'HIJKLMNOPQRSTUVWXYZ0123456789')
export const genId = (len = 16): string =>
  crypto.randomBytes(len).toString('hex')
export const genRef = (prefix = 'REF_', len = 16): string =>
  prefix + crypto.randomBytes(len).toString('hex')
export const genCustomerId = (prefix = 'CUST_', len = 6):
string => genRef(prefix, len)
export const genNumericId = (length = 12): number =>
  Math.floor((new Date()).getTime() / (length * 13))
export const getCategoryCode = (type = 'CUSTOMER'): string | null => {
  switch (type.toUpperCase()) {
    case 'CUSTOMER':
      return '1231'
    case 'MERCHANT':
      return '1234'
    default:
      return null
  }
}
export interface SubEvent {
  data: string
  attributes: Record<string, string>
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAxiosResponse = (response: AxiosResponse): Record<string, any> => ({
  data: (response.data ?? null) as Record<string, any> | null,
  status: response.status,
  headers: (response.headers as Record<string, any> | null) ?? {}
})

export const getAxiosErrorMessage = (e: Error): Record<string, string> => ({
  message: e.message
})
export default {
  check
}
