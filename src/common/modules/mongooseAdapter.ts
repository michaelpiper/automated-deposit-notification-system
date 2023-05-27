import { BaseStorageAdapter } from './storage'
import mongoose from 'mongoose'

export class MongooseStorageAdapter extends BaseStorageAdapter<mongoose.Connection, string> {
  /**
     *
     * @returns {string}
     */
  defaultConfig () {
    return ''
  }

  /**
     *
     * @param {string} url
     * @returns {Mongoose.prototype.Connection}
     */
  createConnection (url: string) {
    return mongoose.createConnection(url, {
      autoIndex: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    } as any)
  }
}
