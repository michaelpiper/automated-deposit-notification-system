import { MongooseStorageAdapter } from '../modules/mongooseAdapter'
import * as config from '../config'
export const MongooseAdapter = new MongooseStorageAdapter().initialize(config.MONGO_CONNECTION_URI)
