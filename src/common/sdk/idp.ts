import axios from 'axios'
import { App } from '../config'
const idp = axios.create(
  {
    baseURL: App.IDP_BASE_URL
  }
)
export default idp
