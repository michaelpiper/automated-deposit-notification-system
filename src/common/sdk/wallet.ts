import axios from 'axios'
import { App } from '../config'
const wallet = axios.create(
  {
    baseURL: App.WALLET_BASE_URL
  }
)
export default wallet
